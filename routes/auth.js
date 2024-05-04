const express = require('express');
const AuthController = require('../controllers/authController');

const authController = new AuthController();
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

module.exports = router;
