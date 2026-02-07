import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function TodoForm({ onSubmit, categories }) {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    category_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      category_id: form.category_id || null,
      due_date: form.due_date || null,
    });
    setForm({ title: '', description: '', priority: 'medium', due_date: '', category_id: '' });
    setExpanded(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-main-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="form-input"
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="btn btn-primary">
          <FiPlus /> Add
        </button>
      </div>
      {expanded && (
        <div className="form-details">
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-textarea"
            rows={2}
          />
          <div className="form-row">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="form-select"
            >
              <option value="">No Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              className="form-date"
            />
          </div>
        </div>
      )}
    </form>
  );
}
