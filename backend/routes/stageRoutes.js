const express = require('express');
const router = express.Router();
const controller = require('../controllers/stageController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

router.post('/', verifyToken, checkRole(['entreprise']), controller.create);
router.put('/:id', verifyToken, checkRole(['entreprise']), controller.update);
router.delete('/:id', verifyToken, checkRole(['entreprise']), controller.remove);

module.exports = router;
