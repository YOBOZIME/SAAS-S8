const express = require('express');
const router = express.Router();
const controller = require('../controllers/tuteurController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

router.post('/', verifyToken,checkRole('admin', 'entreprise'), controller.createTuteur);
router.get('/', verifyToken, checkRole('admin'), controller.getAllTuteurs);
router.delete('/:id', verifyToken, checkRole('admin'), controller.deleteTuteur);

module.exports = router;
