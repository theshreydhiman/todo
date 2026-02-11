const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );
    return this.findById(result.insertId);
  },

  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  },
};

module.exports = User;
