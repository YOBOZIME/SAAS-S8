const express = require('express');
const router = express.Router();
const controller = require('../controllers/stageController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const {validateStageData} = require('../middlewares/validationData')

router.post('/', verifyToken,validateStageData, checkRole(['entreprise']), controller.createStage);
router.put('/:id', verifyToken, checkRole(['entreprise']), controller.updateStage);
router.delete('/:id', verifyToken, checkRole(['entreprise']), controller.removeStage);

module.exports = router;
