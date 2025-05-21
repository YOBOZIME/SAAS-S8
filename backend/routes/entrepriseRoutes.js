const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrepriseController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, controller.create);
router.get('/', verifyToken, controller.getAll);

module.exports = router;
