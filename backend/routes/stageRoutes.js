const express = require('express');
const router = express.Router();
const controller = require('../controllers/stageController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const {validateStageData} = require('../middlewares/validationData')
const { Op } = require('sequelize'); // 🔺 à ajouter en haut
const Entreprise = require('../models/Entreprise');

router.post('/', verifyToken,validateStageData, checkRole(['entreprise']), controller.createStage);
router.put('/:id', verifyToken, checkRole(['entreprise']), controller.updateStage);
router.delete('/:id', verifyToken, checkRole(['entreprise']), controller.removeStage);
router.get('/', controller.getAllStages);
router.get('/mine', verifyToken, checkRole(['entreprise']), controller.getMyStages);

router.get('/others', verifyToken, checkRole(['entreprise']), async (req, res) => {
    try {
      const entreprise = await Entreprise.findOne({ where: { userId: req.user.id } });
      if (!entreprise) return res.status(404).json({ message: "Entreprise introuvable" });
  
      const stages = await controller.getStagesOfOtherEntreprises(entreprise.id);
      console.log("Fetching stages of other entreprises for entreprise ID:", entreprise.id);

      res.json(stages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
