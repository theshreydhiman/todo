const Todo = require('../models/todo.model');

exports.getAll = async (req, res) => {
  try {
    const todos = await Todo.findAll(req.user.id, req.query);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id, req.user.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todo = await Todo.create(req.user.id, req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id, req.user.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    const updated = await Todo.update(req.params.id, req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Todo.delete(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id, req.user.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    const updated = await Todo.toggleComplete(req.params.id, req.user.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Todo.getStats(req.user.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
