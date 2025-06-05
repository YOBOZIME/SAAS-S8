const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateCandidatureData } = require('../middlewares/validationData');

// ✅ met d'abord les routes fixes
// router.get('/me', verifyToken, checkRole(['etudiant']), etudiantController.getMyProfile);
router.get('/etudiant', verifyToken, checkRole(['etudiant']), etudiantController.getMesCandidatures);
router.post('/etudiant', verifyToken, checkRole(['etudiant']), validateCandidatureData, etudiantController.postulerStage);

// ❗ ensuite seulement les routes dynamiques
router.get('/:id', verifyToken, checkRole(['admin', 'etudiant']), etudiantController.getOne);

module.exports = router;
