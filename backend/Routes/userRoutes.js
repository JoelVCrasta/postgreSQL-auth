const express = require('express');
const userController = require('../Controllers/userController');
const { signup, login } = userController;
const userAuth = require('../Middlewares/userAuth');

const router = express.Router();

//signup route
router.post('/signup', userAuth.userAuth, signup);

//login route
router.post('/login', login);

module.exports = router;
