const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');

router.patch('/users/:id/Active', verifyToken, authorizeRoles('admin'), adminController.ActivateUser);
router.get('/stats', verifyToken, authorizeRoles('admin'), adminController.getStatsStages);

module.exports = router;
