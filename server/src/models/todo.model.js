const pool = require('../config/db');

const Todo = {
  async findAll({ search, priority, completed, category_id, sort_by, order }) {
    let query = `
      SELECT t.*, c.name AS category_name, c.color AS category_color
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (t.title LIKE ? OR t.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (priority) {
      query += ' AND t.priority = ?';
      params.push(priority);
    }
    if (completed !== undefined) {
      query += ' AND t.completed = ?';
      params.push(completed === 'true' ? 1 : 0);
    }
    if (category_id) {
      query += ' AND t.category_id = ?';
      params.push(category_id);
    }

    const validSortFields = ['created_at', 'due_date', 'priority', 'title'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY t.${sortField} ${sortOrder}`;

    const [rows] = await pool.query(query, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM todos t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = ?`,
      [id]
    );
    return rows[0];
  },

  async create({ title, description, priority, due_date, category_id }) {
    const [result] = await pool.query(
      'INSERT INTO todos (title, description, priority, due_date, category_id) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, priority || 'medium', due_date || null, category_id || null]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ['title', 'description', 'completed', 'priority', 'due_date', 'category_id'];
    const updates = [];
    const params = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(id);

    params.push(id);
    await pool.query(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async toggleComplete(id) {
    await pool.query('UPDATE todos SET completed = NOT completed WHERE id = ?', [id]);
    return this.findById(id);
  },

  async getStats() {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(completed = 1) AS completed,
        SUM(completed = 0) AS pending,
        SUM(CASE WHEN priority = 'high' AND completed = 0 THEN 1 ELSE 0 END) AS high_priority_count,
        SUM(CASE WHEN due_date < CURDATE() AND completed = 0 THEN 1 ELSE 0 END) AS overdue_count
      FROM todos
    `);
    return rows[0];
  },
};

module.exports = Todo;
