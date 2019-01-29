const express = require('express');
const router  = express.Router();
const authControl = require('../controllers/auth');
const User    = require('../models/users');
const bcrypt  = require('bcryptjs');

router.post('/register', authControl.registration);
router.get('/login', authControl.getlogin);
router.post('/login', authControl.login);
router.get('/logout', authControl.logout);


module.exports = router;
