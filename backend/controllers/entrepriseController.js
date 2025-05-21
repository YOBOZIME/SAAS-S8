const Entreprise = require('../models/Entreprise');

exports.create = async (req, res) => {
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
