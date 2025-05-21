const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, candidatureController.create);

module.exports = router;
