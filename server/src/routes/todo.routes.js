const express = require('express');
const router = express.Router();
const todoCtrl = require('../controllers/todo.controller');

router.get('/stats', todoCtrl.getStats);
router.get('/', todoCtrl.getAll);
router.get('/:id', todoCtrl.getById);
router.post('/', todoCtrl.create);
router.put('/:id', todoCtrl.update);
router.patch('/:id/toggle', todoCtrl.toggleComplete);
router.delete('/:id', todoCtrl.delete);

module.exports = router;
