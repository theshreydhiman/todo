const pool = require('../config/db');

const Todo = {
  async findAll(userId, { search, priority, completed, category_id, sort_by, order }) {
    let query = `
      SELECT t.*, c.name AS category_name, c.color AS category_color
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
    `;
    const params = [userId];

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

  async findById(id, userId) {
    const [rows] = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM todos t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = ? AND t.user_id = ?`,
      [id, userId]
    );
    return rows[0];
  },

  async create(userId, { title, description, priority, due_date, category_id }) {
    const [result] = await pool.query(
      'INSERT INTO todos (title, description, priority, due_date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || null, priority || 'medium', due_date || null, category_id || null, userId]
    );
    return this.findById(result.insertId, userId);
  },

  async update(id, userId, fields) {
    const allowed = ['title', 'description', 'completed', 'priority', 'due_date', 'category_id'];
    const updates = [];
    const params = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(id, userId);

    params.push(id, userId);
    await pool.query(`UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, params);
    return this.findById(id, userId);
  },

  async delete(id, userId) {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows > 0;
  },

  async toggleComplete(id, userId) {
    await pool.query('UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?', [id, userId]);
    return this.findById(id, userId);
  },

  async getStats(userId) {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(completed = 1) AS completed,
        SUM(completed = 0) AS pending,
        SUM(CASE WHEN priority = 'high' AND completed = 0 THEN 1 ELSE 0 END) AS high_priority_count,
        SUM(CASE WHEN due_date < CURDATE() AND completed = 0 THEN 1 ELSE 0 END) AS overdue_count
      FROM todos
      WHERE user_id = ?
    `, [userId]);
    return rows[0];
  },
};

module.exports = Todo;
