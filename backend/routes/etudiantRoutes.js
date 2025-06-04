const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateCandidatureData } = require('../middlewares/validationData');

router.get('/etudiant', verifyToken, checkRole(['etudiant']), etudiantController.getMesCandidatures);
router.post('/etudiant', verifyToken, checkRole(['etudiant']), validateCandidatureData, etudiantController.postulerStage);

module.exports = router;
