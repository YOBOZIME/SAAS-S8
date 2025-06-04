const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// Exemple : récupérer tous les utilisateurs (admin)
router.get('/', verifyToken, checkRole(['admin']), userController.getAllUsers);

module.exports = router;
