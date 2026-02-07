import React, { useState } from 'react';
import { FiTrash2, FiEdit2, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import { format, isPast, isToday } from 'date-fns';

const priorityColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };

export default function TodoItem({ todo, onToggle, onUpdate, onDelete, categories }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    due_date: todo.due_date ? todo.due_date.split('T')[0] : '',
    category_id: todo.category_id || '',
  });

  const handleSave = () => {
    if (!form.title.trim()) return;
    onUpdate(todo.id, {
      ...form,
      category_id: form.category_id || null,
      due_date: form.due_date || null,
    });
    setEditing(false);
  };

  const dueDate = todo.due_date ? new Date(todo.due_date) : null;
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && !todo.completed;

  if (editing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="form-input"
          autoFocus
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="form-textarea"
          rows={2}
          placeholder="Description"
        />
        <div className="form-row">
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="form-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="form-select">
            <option value="">No Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="form-date" />
        </div>
        <div className="edit-actions">
          <button onClick={handleSave} className="btn btn-primary btn-sm"><FiCheck /> Save</button>
          <button onClick={() => setEditing(false)} className="btn btn-secondary btn-sm"><FiX /> Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-left">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          style={{ borderColor: priorityColors[todo.priority] }}
        >
          {todo.completed && <FiCheck />}
        </button>
        <div className="todo-content">
          <span className="todo-title">{todo.title}</span>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          <div className="todo-meta">
            <span className="priority-badge" style={{ backgroundColor: priorityColors[todo.priority] }}>
              {todo.priority}
            </span>
            {todo.category_name && (
              <span className="category-badge" style={{ backgroundColor: todo.category_color }}>
                {todo.category_name}
              </span>
            )}
            {dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
                <FiCalendar /> {format(dueDate, 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setEditing(true)} className="btn-icon" title="Edit">
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(todo.id)} className="btn-icon btn-danger" title="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
