const Candidature = require('../models/Candidature');

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
