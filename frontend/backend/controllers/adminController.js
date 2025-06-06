const { User, Stage } = require('../models');

exports.ActivateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.actif = !user.actif;
    await user.save();

    res.json({ message: 'Statut mis à jour', actif: user.actif });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getStatsStages = async (req, res) => {
  try {
    console.log("🔍 Récupération des stats...");
    
    const [enAttente, valides, refuses] = await Promise.all([
      Stage.count({ where: { status: 'en attente' } }),
      Stage.count({ where: { status: 'validé' } }),
      Stage.count({ where: { status: 'refusé' } }),
    ]);

    console.log({ enAttente, valides, refuses });

    res.json({ enAttente, valides, refuses });
  } catch (err) {
    console.error("❌ Erreur dans getStatsStages:", err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['motdepasse'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
