const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUserRegistration } = require('../middlewares/validationData');

router.post('/register', validateUserRegistration, authController.register);
router.post('/login', authController.login);

module.exports = router;
