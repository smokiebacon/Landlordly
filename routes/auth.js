const express = require('express');
const router  = express.Router();
const authControl = require('../controllers/auth');
const User    = require('../models/users');
const bcrypt  = require('bcryptjs');

router.get('/', function (req, res, next) {
    res.render('posts', {
        title: 'Posts',
        posts: posts 
    })
})


router.post('/register', authControl.registration);
router.get('/login', authControl.getlogin);
router.get('/register', authControl.getregister);
router.post('/login', authControl.login);
router.get('/logout', authControl.logout);


module.exports = router;
