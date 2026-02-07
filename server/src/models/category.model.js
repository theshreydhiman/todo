const pool = require('../config/db');

const Category = {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT c.*, COUNT(t.id) AS todo_count
       FROM categories c
       LEFT JOIN todos t ON c.id = t.category_id
       GROUP BY c.id
       ORDER BY c.name`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, color }) {
    const [result] = await pool.query(
      'INSERT INTO categories (name, color) VALUES (?, ?)',
      [name, color || '#6366f1']
    );
    return this.findById(result.insertId);
  },

  async update(id, { name, color }) {
    const updates = [];
    const params = [];
    if (name !== undefined) { updates.push('name = ?'); params.push(name); }
    if (color !== undefined) { updates.push('color = ?'); params.push(color); }
    if (updates.length === 0) return this.findById(id);

    params.push(id);
    await pool.query(`UPDATE categories SET ${updates.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Category;
