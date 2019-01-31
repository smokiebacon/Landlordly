const userControl = require('../controllers/users')
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', userControl.index);
router.get('/new', userControl.new);
router.get('/newpay', userControl.newpay);
router.get('/newmain/:propId', userControl.newmain);
router.post('/', userControl.create);
router.get('/:id', userControl.show);
router.put('/:id', userControl.update);
// router.get('/:id/edit', userControl.edit);
router.delete('/:id/delete', userControl.delete);
router.delete('/:id/deleteTenant', userControl.deletedTenant);

//send a form with id

module.exports = router;
