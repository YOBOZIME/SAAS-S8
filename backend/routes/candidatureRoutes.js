const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidatureController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

router.post('/', verifyToken, checkRole(['etudiant']), controller.create);       
router.get('/', verifyToken, checkRole(['admin', 'entreprise']), controller.getAll); 
router.get('/:id', verifyToken, checkRole(['admin', 'entreprise', 'etudiant']), controller.getOne); 
router.put('/:id', verifyToken, checkRole(['entreprise', 'admin']), controller.update);
router.delete('/:id', verifyToken, checkRole(['admin']), controller.remove); 

module.exports = router;
