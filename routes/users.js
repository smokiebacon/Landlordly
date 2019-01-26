const userControl = require('../controllers/users')
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', userControl.index);
router.get('/new', userControl.new);

module.exports = router;
