const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrepriseController');
const candidatureController = require('../controllers/candidatureController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateEntrepriseData } = require('../middlewares/validators');


router.post('/', verifyToken,validateEntrepriseData,checkRole('entreprise '), controller.create);
router.get('/', verifyToken, controller.getAll);
router.patch('/candidatures/:id', verifyToken, checkRole('entreprise'), candidatureController.gererCandidature);

module.exports = router;
