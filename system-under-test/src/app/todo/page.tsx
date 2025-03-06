'use client'

import React, { useState, useEffect } from 'react';

const USERNAME = 'admin';
const PASSWORD = 'password';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load todos from the server when component mounts and user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadTodos();
    }
  }, [isLoggedIn]);

  // Function to load todos from the API
  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Failed to load todos');
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save todos to the API
  const saveTodos = async (updatedTodos: Todo[]) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodos),
      });

      if (!response.ok) {
        console.error('Failed to save todos');
      }
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const updatedTodos = [
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ];
      setTodos(updatedTodos);
      setNewTodo('');
      saveTodos(updatedTodos);
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex pt-16 items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">Login</button>

          <div className="text-sm text-gray-500 mt-2">
            <p>Test username: <code className="text-gray-700">{USERNAME}</code></p>
            <p>Test password: <code className="text-gray-700">{PASSWORD}</code></p>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>



      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading todos...</p>
      ) : (
        <>
          <form onSubmit={addTodo} className="mb-4">
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                aria-label="New todo item"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" type="submit">Add</button>
            </div>
          </form>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className={`flex items-center p-2 border rounded ${todo.completed ? 'bg-green-100' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  aria-label={`Delete "${todo.text}"`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsLoggedIn(false)}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
}
