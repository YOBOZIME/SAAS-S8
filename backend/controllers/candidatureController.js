const Candidature = require('../models/Candidature');
const Etudiant = require('../models/Etudiant');
const User = require('../models/User');
const Stage = require('../models/Stage');

exports.create = async (req, res) => {
  try {
    const { etudiantId, stageId, message } = req.body;

    const candidature = await Candidature.create({
      etudiantId,
      stageId,
      message
    });

    res.status(201).json({ message: 'Candidature envoyée', candidature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const candidatures = await Candidature.findAll();
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    candidature.statut = statut;
    await candidature.save();

    res.json({ message: 'Statut mis à jour', candidature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  if (!['acceptée', 'refusée'].includes(statut)) {
    return res.status(400).json({ message: "Statut invalide." });
  }

  try {
    const candidature = await Candidature.findByPk(id);
    if (!candidature) {
      return res.status(404).json({ message: "Candidature introuvable." });
    }

    candidature.statut = statut; // ✅ correction ici
    await candidature.save();

    res.status(200).json({ message: "Statut mis à jour.", candidature });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};



exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    await candidature.destroy();
    res.json({ message: 'Candidature supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCandidaturesEntreprise = async (req, res) => {
  try {
    const userId = req.user.id;

    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: 'Entreprise non trouvée' });

    const candidatures = await Candidature.findAll({
      where: { etudiantId: etudiant.id },
      include: [{
        model: Stage,
        required: true  // 💡 n'inclut que les stages encore existants
      }]
    });
    

    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
  }
};

exports.gererCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, commentaireEntreprise } = req.body;

    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    candidature.status = statut;
    candidature.commentaireEntreprise = commentaireEntreprise;
    await candidature.save();

    res.status(200).json({ message: 'Candidature mise à jour', candidature });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la candidature' });
  }
};

exports.createCandidature = async (req, res) => {
  try {
    console.log("✅ Reçu dans createCandidature");
    const { stageId, message } = req.body;
    const cv = req.file ? req.file.filename : null;
    const userId = req.user.id;

    const etudiant = await Etudiant.findOne({ where: { userId } });
    if (!etudiant) return res.status(404).json({ message: "Étudiant introuvable" });

    // ✅ VÉRIFICATION AVANT INSERTION
    const dejaEnvoyee = await Candidature.findOne({
      where: { stageId, etudiantId: etudiant.id }
    });

    if (dejaEnvoyee) {
      return res.status(400).json({ message: "Vous avez déjà postulé à ce stage." });
    }

    // ✅ SI PAS DEJA POSTULÉ, ON CRÉE LA CANDIDATURE
    const candidature = await Candidature.create({
      message,
      cv,
      stageId,
      etudiantId: etudiant.id,
      statut: "en_attente"
    });

    res.status(201).json(candidature);
  } catch (error) {
    console.error("🔥 Erreur createCandidature:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


exports.getByStage = async (req, res) => {
  try {
    const { id } = req.params;
    const candidatures = await Candidature.findAll({
      where: { stageId : id },
      attributes: ['id', 'message', 'statut', 'cv'], // <<< ajoute `message`
      include: [
        {
          model: Etudiant,
          attributes: ['filiere', 'niveau'],
          include: [{ model: User, attributes: ['prenom', 'nom', 'email'] }]
        }
      ]
    });
    res.json(candidatures);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getByStageId = async (req, res) => {
  const { stageId } = req.params;
  try {
    const candidatures = await Candidature.findAll({
      where: { stageId },
      attributes: ['id', 'message', 'statut', 'cv'], // ✅ ajoute cette ligne
      include: [
        {
          model: Etudiant,
          attributes: ['filiere', 'niveau'],
          include: [
            {
              model: User,
              attributes: ['prenom', 'nom', 'email']
            }
          ]
        }
      ]
    });
    res.json(candidatures);
  } catch (err) {
    console.error("Erreur getByStageId:", err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


exports.getMine = async (req, res) => {
  try {
    const userId = req.user.id;
    const etudiant = await Etudiant.findOne({ where: { userId } });
    if (!etudiant) return res.status(404).json({ message: "Étudiant introuvable" });

    const candidatures = await Candidature.findAll({
      where: { etudiantId: etudiant.id },
      include: [{ model: Stage }]
    });

    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
