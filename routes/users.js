const userControl = require('../controllers/users')
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', userControl.index);
router.get('/new', userControl.new);
router.get('/newmain', userControl.newmain);
router.post('/', userControl.create);

// router.get('/:id/edit', userControl.edit);
// router.get('/:id', userControl.show);
// router.put('/:id', userControl.update);
// router.delete('/:id', userControl.delete);

//send a form with id

module.exports = router;
