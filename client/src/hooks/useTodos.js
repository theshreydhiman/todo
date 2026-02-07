import { useState, useEffect, useCallback } from 'react';
import { todoApi, categoryApi } from '../services/api';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await todoApi.getAll(filters);
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await todoApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const refreshAll = useCallback(() => {
    fetchTodos();
    fetchStats();
    fetchCategories();
  }, [fetchTodos, fetchStats, fetchCategories]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const addTodo = async (todoData) => {
    await todoApi.create(todoData);
    refreshAll();
  };

  const updateTodo = async (id, todoData) => {
    await todoApi.update(id, todoData);
    refreshAll();
  };

  const toggleTodo = async (id) => {
    await todoApi.toggle(id);
    refreshAll();
  };

  const deleteTodo = async (id) => {
    await todoApi.delete(id);
    refreshAll();
  };

  const addCategory = async (catData) => {
    await categoryApi.create(catData);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await categoryApi.delete(id);
    refreshAll();
  };

  return {
    todos, categories, stats, loading,
    filters, setFilters,
    addTodo, updateTodo, toggleTodo, deleteTodo,
    addCategory, deleteCategory,
  };
}
