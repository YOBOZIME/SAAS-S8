const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, etudiantController.create);

module.exports = router;