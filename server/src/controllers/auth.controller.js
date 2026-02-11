const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'todo-app-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!email || !email.trim()) return res.status(400).json({ error: 'Email is required' });
    if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existing = await User.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email is already registered' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await User.comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
