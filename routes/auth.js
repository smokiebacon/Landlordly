const express = require('express');
const router  = express.Router();
const authControl = require('../controllers/auth');
const User    = require('../models/users');
const bcrypt  = require('bcryptjs');


router.post('/registration', authControl.registration);
router.post('/login', authControl.login);



module.exports = router;
