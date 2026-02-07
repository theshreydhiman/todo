import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiTag } from 'react-icons/fi';

export default function Sidebar({ categories, onAddCategory, onDeleteCategory, filters, setFilters }) {
  const [newCat, setNewCat] = useState('');
  const [newColor, setNewColor] = useState('#6366f1');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    onAddCategory({ name: newCat, color: newColor });
    setNewCat('');
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title"><FiTag /> Categories</h3>
      <ul className="category-list">
        <li
          className={`category-item ${!filters.category_id ? 'active' : ''}`}
          onClick={() => setFilters((f) => { const n = { ...f }; delete n.category_id; return n; })}
        >
          <span className="category-dot" style={{ backgroundColor: '#6b7280' }} />
          All Categories
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`category-item ${String(filters.category_id) === String(cat.id) ? 'active' : ''}`}
            onClick={() => setFilters((f) => ({ ...f, category_id: cat.id }))}
          >
            <span className="category-dot" style={{ backgroundColor: cat.color }} />
            {cat.name}
            <span className="category-count">{cat.todo_count}</span>
            <button
              className="btn-icon btn-sm"
              onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }}
              title="Delete category"
            >
              <FiTrash2 size={12} />
            </button>
          </li>
        ))}
      </ul>
      <form className="add-category-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New category..."
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          className="form-input form-input-sm"
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="color-picker"
        />
        <button type="submit" className="btn btn-primary btn-sm"><FiPlus /></button>
      </form>
    </aside>
  );
}
