const propertyControl = require('../controllers/properties')
const express = require('express');
const router = express.Router();

/* GET properties listing. */
router.get('/', propertyControl.index);
router.get('/new', propertyControl.new);
router.post('/', propertyControl.create);
router.get('/:id/edit', propertyControl.edit);
router.get('/:id', propertyControl.show);
router.put('/:id', propertyControl.update);
router.delete('/:id', propertyControl.delete);

module.exports = router;
