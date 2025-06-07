const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateCandidatureData } = require('../middlewares/validationData');
const uploadPhoto = require('../middlewares/uploadPhoto');
router.patch('/photo', verifyToken, checkRole(['etudiant']), uploadPhoto.single('photo'), etudiantController.updatePhoto);

router.get('/me', verifyToken, checkRole(['etudiant']), etudiantController.getMyProfile);
const upload = require('../middlewares/upload');

//router.patch('/photo', verifyToken, checkRole(['etudiant']), upload.single('photo'), etudiantController.updatePhoto);

router.get('/mes-candidatures', verifyToken, checkRole(['etudiant']), etudiantController.getMesCandidatures);

router.post('/postuler', verifyToken, checkRole(['etudiant']), validateCandidatureData, etudiantController.postulerStage);

router.get('/:id', verifyToken, checkRole(['admin', 'etudiant']), etudiantController.getOne);

module.exports = router;
