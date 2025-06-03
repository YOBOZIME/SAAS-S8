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

exports.getAll = async (req, res) => {
  try {
    const candidatures = await Candidature.findAll();
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    candidature.statut = statut;
    await candidature.save();

    res.json({ message: 'Statut mis à jour', candidature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    await candidature.destroy();
    res.json({ message: 'Candidature supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCandidaturesEntreprise = async (req, res) => {
  try {
    const userId = req.user.id;

    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: 'Entreprise non trouvée' });

    const candidatures = await Candidature.findAll({
      where: { entrepriseId: entreprise.id },
      include: [
        { model: Stage },
        { model: Etudiant }
      ]
    });

    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
  }
};

exports.gererCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, commentaireEntreprise } = req.body;

    const candidature = await Candidature.findByPk(id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    candidature.status = statut;
    candidature.commentaireEntreprise = commentaireEntreprise;
    await candidature.save();

    res.status(200).json({ message: 'Candidature mise à jour', candidature });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la candidature' });
  }
};
