import React from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos';
import StatsBar from './components/StatsBar';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';

function App() {
  const {
    todos, categories, stats, loading,
    filters, setFilters,
    addTodo, updateTodo, toggleTodo, deleteTodo,
    addCategory, deleteCategory,
  } = useTodos();

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
        <p className="subtitle">Organize your tasks efficiently</p>
      </header>
      <StatsBar stats={stats} />
      <div className="main-layout">
        <Sidebar
          categories={categories}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          filters={filters}
          setFilters={setFilters}
        />
        <main className="content">
          <TodoForm onSubmit={addTodo} categories={categories} />
          <FilterBar filters={filters} setFilters={setFilters} categories={categories} />
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            categories={categories}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
