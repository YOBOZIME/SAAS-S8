const Etudiant = require('../models/Etudiant');

exports.create = async (req, res) => {
  try {
    const { filiere, etablissement, niveau, userId } = req.body;
    const etudiant = await Etudiant.create({ filiere, etablissement, niveau, userId });
    res.status(201).json({ message: 'Étudiant créé', etudiant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};