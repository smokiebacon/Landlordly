const propertyControl = require('../controllers/properties')
const express = require('express');
const router = express.Router();

/* GET properties listing. */
router.get('/', propertyControl.index);
router.get('/new', propertyControl.new);
router.get('/maintenance', propertyControl.showmaint);
router.post('/', propertyControl.create);
router.get('/:id/edit', propertyControl.edit);
router.get('/:id', propertyControl.show);
router.put('/:id', propertyControl.update);
router.delete('/:id', propertyControl.delete);
router.get('/:id/add-tenant', propertyControl.showAddTenant);
router.post('/:id/add-tenant', propertyControl.addTenant);
router.post('/:id/add-maintreq', propertyControl.maintreq);



//router.delete('/:id', propertyControl.deleteTenant);

module.exports = router;
