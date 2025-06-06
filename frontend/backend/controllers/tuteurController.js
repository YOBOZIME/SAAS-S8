const Tuteur = require('../models/Tuteur');
const User = require('../models/User');
const Entreprise = require('../models/Entreprise');

exports.createTuteur = async (req, res) => {
  try {
    const { fonction, userId, entrepriseId } = req.body;

    const tuteur = await Tuteur.create({ fonction, userId, entrepriseId });

    res.status(201).json({ message: 'Tuteur créé', tuteur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTuteurs = async (req, res) => {
  try {
    const tuteurs = await Tuteur.findAll({
      include: [User, Entreprise]
    });
    res.json(tuteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTuteur = async (req, res) => {
  try {
    const { id } = req.params;
    const tuteur = await Tuteur.findByPk(id);
    if (!tuteur) return res.status(404).json({ message: 'Tuteur non trouvé' });

    await tuteur.destroy();
    res.json({ message: 'Tuteur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
