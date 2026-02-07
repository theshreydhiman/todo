const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller');

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getById);
router.post('/', categoryCtrl.create);
router.put('/:id', categoryCtrl.update);
router.delete('/:id', categoryCtrl.delete);

module.exports = router;
