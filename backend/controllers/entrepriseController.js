const { Stage, Candidature, Etudiant } = require('../models');
const Entreprise = require('../models/Entreprise');
const path = require('path');

exports.createEntreprise = async (req, res) => {
  try {
    const { nomSociete, secteur, adresse, siteWeb, telephone, userId } = req.body;

    const entreprise = await Entreprise.create({
      nomSociete,
      secteur,
      adresse,  
      siteWeb,
      telephone,
      userId
    });

    res.status(201).json({ message: 'Entreprise créée', entreprise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const entreprises = await Entreprise.findAll();
    res.json(entreprises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntrepriseProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const entreprise = await Entreprise.findOne({ where: { userId } });

    if (!entreprise) return res.status(404).json({ message: "Profil entreprise introuvable" });

    res.json(entreprise);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


exports.getCandidatures = async (req, res) => {
  try {
    const userId = req.user.id;
    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: 'Entreprise non trouvée' });

    const candidatures = await Candidature.findAll({
      include: [
        { model: Etudiant, as: 'etudiant' },
        {
          model: Stage,
          where: { entrepriseId: entreprise.id },
          attributes: ['titre']
        }
      ]
    });

    res.json(candidatures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/entrepriseController.js
exports.updatePhoto = async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({ where: { userId: req.user.id } });
    if (!entreprise) return res.status(404).json({ message: "Entreprise non trouvée" });

    entreprise.photo = req.file.filename; // nom du fichier dans le dossier uploads/
    await entreprise.save();

    res.json({ message: "Photo mise à jour", photo: entreprise.photo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
