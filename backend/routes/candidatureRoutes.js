const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController'); // ✅ une seule fois
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/upload');

router.post(
  '/',
  verifyToken,
  checkRole(['etudiant']),
  upload.single('cv'),
  candidatureController.createCandidature
);

router.get('/', verifyToken, checkRole(['admin', 'entreprise']), candidatureController.getAll); 
router.get('/:id', verifyToken, checkRole(['admin', 'entreprise', 'etudiant']), candidatureController.getOne); 
router.get('/stage/:stageId', verifyToken, checkRole(['entreprise', 'admin']), candidatureController.getByStageId);
router.get('/mine', verifyToken, checkRole(['etudiant']), candidatureController.getMine);

router.put('/:id', verifyToken, checkRole(['entreprise', 'admin']), candidatureController.update);
router.patch('/:id/status', verifyToken, checkRole(['entreprise']), candidatureController.updateStatus);
router.delete('/:id', verifyToken, checkRole(['admin']), candidatureController.remove); 

module.exports = router;
