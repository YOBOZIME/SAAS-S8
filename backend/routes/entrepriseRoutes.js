const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrepriseController');
const candidatureController = require('../controllers/candidatureController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateEntrepriseData } = require('../middlewares/validationData');
const upload = require('../middlewares/multer');
const { updatePhoto } = require('../controllers/entrepriseController');

router.post('/', verifyToken, checkRole(['entreprise']), validateEntrepriseData, controller.createEntreprise);
router.get('/', verifyToken, controller.getAll);
router.get('/profil', verifyToken, checkRole(['entreprise']), controller.getEntrepriseProfile);
router.patch('/candidatures/:id', verifyToken, checkRole(['entreprise']), candidatureController.gererCandidature);
router.patch('/photo', verifyToken, upload.single('photo'), updatePhoto);
router.get('/candidatures', verifyToken, checkRole(['entreprise']), controller.getCandidatures);

module.exports = router;
