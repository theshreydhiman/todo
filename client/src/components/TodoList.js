import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, onToggle, onUpdate, onDelete, categories }) {
  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
          categories={categories}
        />
      ))}
    </div>
  );
}
