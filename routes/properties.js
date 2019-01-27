const propertyControl = require('../controllers/properties')
const express = require('express');
const router = express.Router();

/* GET propertys listing. */
router.get('/', propertyControl.index);
router.get('/new', propertyControl.new);

module.exports = router;
