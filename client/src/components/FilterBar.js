import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function FilterBar({ filters, setFilters, categories }) {
  const update = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (!value) delete next[key];
      return next;
    });
  };

  return (
    <div className="filter-bar">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search todos..."
          value={filters.search || ''}
          onChange={(e) => update('search', e.target.value)}
          className="search-input"
        />
      </div>
      <select
        value={filters.completed || ''}
        onChange={(e) => update('completed', e.target.value)}
        className="form-select"
      >
        <option value="">All Status</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
      <select
        value={filters.priority || ''}
        onChange={(e) => update('priority', e.target.value)}
        className="form-select"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={filters.category_id || ''}
        onChange={(e) => update('category_id', e.target.value)}
        className="form-select"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select
        value={filters.sort_by || ''}
        onChange={(e) => update('sort_by', e.target.value)}
        className="form-select"
      >
        <option value="">Sort: Newest</option>
        <option value="due_date">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
        <option value="title">Sort: Title</option>
      </select>
    </div>
  );
}
