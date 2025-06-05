const { Etudiant, Candidature, Stage, Entreprise, User } = require('../models');

exports.getMesCandidatures = async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({ where: { userId: req.user.id } });

    if (!etudiant) {
      return res.status(404).json({ message: "Profil étudiant introuvable." });
    }

    const candidatures = await Candidature.findAll({
      where: { etudiantId: etudiant.id },
      include: [
        {
          model: Stage,
          attributes: ['id', 'titre', 'description', 'dateDébut', 'dateFin', 'status']
        },
        {
          model: Entreprise,
          attributes: ['id', 'nom', 'secteur']
        }
      ]
    });

    res.status(200).json(candidatures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des candidatures." });
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
  console.log("✅ route /me appelée"); // ← pour vérifier l'appel

  try {
    const etudiant = await Etudiant.findOne({
      where: { userId: req.user.id },
      include: [{ model: User }]
    });

    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    res.json(etudiant);
  } catch (error) {
    console.error("❌ Erreur dans getMyProfile:", error);  // ← log clair
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
