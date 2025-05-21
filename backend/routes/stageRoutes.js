const express = require('express');
const router = express.Router();
const controller = require('../controllers/stageController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, controller.create); // créer un stage

module.exports = router;
