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

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await Stage.findByPk(id);
    if (!stage) return res.status(404).json({ message: 'Stage non trouvé' });

    await stage.update(req.body);
    res.json({ message: 'Stage mis à jour', stage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await Stage.findByPk(id);
    if (!stage) return res.status(404).json({ message: 'Stage non trouvé' });

    await stage.destroy();
    res.json({ message: 'Stage supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
