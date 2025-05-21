const Stage = require('../models/Stage');

exports.create = async (req, res) => {
  try {
    const { titre, description, domaine, lieu, dateDebut, dateFin, entrepriseId } = req.body;

    const stage = await Stage.create({
      titre,
      description,
      domaine,
      lieu,
      dateDebut,
      dateFin,
      entrepriseId
    });

    res.status(201).json({ message: 'Stage créé', stage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
