const { Etudiant, Candidature, Stage, Entreprise, User } = require('../models');

exports.getMesCandidatures = async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({ where: { userId: req.user.id } });
    if (!etudiant) return res.status(404).json({ message: 'Étudiant introuvable' });

    const candidatures = await Candidature.findAll({
      where: { etudiantId: etudiant.id },
      include: [{ model: Stage }]
    });

    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.postulerStage = async (req, res) => {
  try {
    const { stageId } = req.body;

    if (!stageId) {
      return res.status(400).json({ message: "Le stageId est requis." });
    }

    const etudiant = await Etudiant.findOne({ where: { userId: req.user.id } });
    if (!etudiant) {
      return res.status(404).json({ message: "Profil étudiant introuvable." });
    }

    const stage = await Stage.findByPk(stageId);
    if (!stage) {
      return res.status(404).json({ message: "Stage introuvable." });
    }

    const existingCandidature = await Candidature.findOne({
      where: {
        stageId,
        etudiantId: etudiant.id
      }
    });

    if (existingCandidature) {
      return res.status(409).json({ message: "Vous avez déjà postulé à ce stage." });
    }

    const candidature = await Candidature.create({
      stageId,
      etudiantId: etudiant.id,
      entrepriseId: stage.entrepriseId,
      datePostulation: new Date(),
      status: "en attente"
    });

    res.status(201).json({ message: "Candidature envoyée avec succès.", candidature });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la soumission de la candidature." });
  }
};

exports.getOne = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id, {
      include: [{ model: User }]
    });
    if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });
    res.json(etudiant);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ['nom', 'prenom', 'email'] }]
    });
    if (!etudiant) return res.status(404).json({ message: 'Étudiant introuvable' });
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Aucun fichier envoyé." });

    const etudiant = await Etudiant.findOne({ where: { userId } });
    if (!etudiant) return res.status(404).json({ message: "Étudiant introuvable" });

    etudiant.photo = file.filename;
    await etudiant.save();

    res.json({ message: "Photo mise à jour", photo: etudiant.photo });
  } catch (err) {
    console.error("Erreur updatePhoto:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
