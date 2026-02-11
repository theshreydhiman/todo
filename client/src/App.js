import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthPage from './components/AuthPage';
import { useTodos } from './hooks/useTodos';
import StatsBar from './components/StatsBar';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';
import { FiLogOut, FiUser } from 'react-icons/fi';

function TodoApp() {
  const { user, logout } = useAuth();
  const {
    todos, categories, stats, loading,
    filters, setFilters,
    addTodo, updateTodo, toggleTodo, deleteTodo,
    addCategory, deleteCategory,
  } = useTodos();

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1>Todo App</h1>
          <div className="user-menu">
            <span className="user-name"><FiUser /> {user.name}</span>
            <button onClick={logout} className="btn btn-secondary btn-sm">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
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

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return user ? <TodoApp /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
