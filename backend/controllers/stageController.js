const Stage = require('../models/Stage');
const Entreprise = require('../models/Entreprise'); // ✅ AJOUT ICI
const Publication = require('../models/Publication'); // ✅ à importer
const { Op } = require('sequelize');
const { Candidature, Etudiant, User } = require('../models'); // ajoute Candidature, Etudiant, User

exports.createStage = async (req, res) => {
  try {
    const { titre, description, domaine, lieu, dateDebut, dateFin } = req.body;
    const userId = req.user.id;

    const entreprise = await Entreprise.findOne({ where: { userId } });
    if (!entreprise) return res.status(404).json({ message: "Entreprise non trouvée" });

    const stage = await Stage.create({
      titre,
      description,
      domaine,
      lieu,
      dateDebut,
      dateFin,
      entrepriseId: entreprise.id,
      status: 'en attente'
    });

    await Publication.create({
      auteur: entreprise.nomSociete,
      contenu: `Une nouvelle offre de stage "${titre}" a été publiée par ${entreprise.nomSociete}.`,
      stageId: stage.id
    });

    res.status(201).json({ message: 'Stage et publication créés', stage });
  } catch (error) {
    console.error("Erreur createStage :", error);
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
    const { statut } = req.query;
    const whereClause = statut ? { status: statut } : {};

    // Choix du statut de candidature à inclure
    let statutCandidature = null;
    if (statut === 'validé') statutCandidature = 'acceptée';
    if (statut === 'refusé') statutCandidature = 'refusée';

    const stages = await Stage.findAll({
      where: whereClause,
      include: [
        {
          model: Entreprise,
          attributes: ['nomSociete']
        },
        {
          model: Candidature,
          where: statutCandidature ? { statut: statutCandidature } : undefined,
          required: false,
          include: {
            model: Etudiant,
            include: {
              model: User,
              attributes: ['prenom', 'nom', 'email']
            }
          }
        }
      ]
    });

    res.json(stages);
  } catch (err) {
    console.error("Erreur dans getAllStages:", err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};



exports.removeStage = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await Stage.findByPk(id);
    if (!stage) return res.status(404).json({ message: 'Stage non trouvé' });

    await stage.destroy({ force: true });
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

exports.getStagesOfOtherEntreprises = async (currentEntrepriseId) => {
  const stages = await Stage.findAll({
    where: { entrepriseId: { [Op.ne]: currentEntrepriseId } },
    include: {
      model: Entreprise,
      attributes: ['nomSociete', 'secteur']
    }
  });

  console.log("Stages found for other entreprises:", stages.length);
  return stages;
};


exports.updateStageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['en attente', 'validé', 'refusé'].includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const stage = await Stage.findByPk(id);
    if (!stage) return res.status(404).json({ message: "Stage non trouvé" });

    stage.status = status;
    await stage.save();

    res.json({ message: "Statut mis à jour", stage });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
