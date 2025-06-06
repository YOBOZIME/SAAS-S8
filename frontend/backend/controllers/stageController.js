const Stage = require('../models/Stage');
const Entreprise = require('../models/Entreprise'); // ✅ AJOUT ICI

exports.createStage = async (req, res) => {
  try {
    const { titre, description, domaine, lieu, dateDebut, dateFin } = req.body;
    const userId = req.user.id;

    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: "Entreprise non trouvée" });

    const entrepriseId = entreprise.id;

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


exports.updateStage = async (req, res) => {
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

exports.getAllStages = async (req, res) => {
  try {
    const stages = await Stage.findAll();
    res.json(stages);
  } catch (err) {
    console.error("Erreur dans getAllStages:", err); // ✅ Ajoute ceci pour voir l'erreur réelle
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


exports.removeStage = async (req, res) => {
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

exports.getMyStages = async (req, res) => {
  try {
    const userId = req.user.id;
    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: "Entreprise non trouvée" });

    const stages = await Stage.findAll({ where: { entrepriseId: entreprise.id } });
    res.json(stages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};