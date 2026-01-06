import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = ({ token, onLogout }) => {
  const [currentTodo, setCurrentTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodoList(response.data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    }
  };

  const addTodo = async () => {
    if (currentTodo.trim() === '') return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/todos',
        { text: currentTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodoList([...todoList, response.data]);
      setCurrentTodo('');
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodoList(todoList.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  const editTodo = (id) => {
    const todo = todoList.find((t) => t._id === id);
    setCurrentTodo(todo.text);
    deleteTodo(id);
  };

  const toggleTodoStatus = async (id) => {
    const todo = todoList.find((t) => t._id === id);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { text: todo.text, completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodoList(
        todoList.map((t) => (t._id === id ? response.data : t))
      );
    } catch (err) {
      console.error('Failed to update todo', err);
    }
  };

  const activeTodos = todoList.filter((t) => !t.completed);
  const doneTodos = todoList.filter((t) => t.completed);

  return (
    <>
      {/* Logout */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            onLogout();
          }}
          className="text-rose-600 text-sm underline"
        >
          Logout
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-rose-900">To-Do List</h1>
          <p className="text-[13px] text-rose-300 mt-1">
            Keep your day calm and organised
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task…"
            className="
              flex-1 bg-[#fae6ed]/70 outline-none px-4 py-3 rounded-xl
              text-rose-900 text-[15px] placeholder:text-rose-300
              border border-rose-200/60 shadow-inner
            "
          />

          <button
            onClick={addTodo}
            className="
              px-5 rounded-xl text-white bg-gradient-to-r
              from-[#f7b5ca] via-[#e6a1b7] to-[#d67d99]
              border border-rose-300/50 shadow-md
              hover:brightness-105 transition
            "
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        {/* Active Todos */}
        <h2 className="text-rose-900 font-medium">Active</h2>
        <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {activeTodos.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-[#fae6ed]/75 px-4 py-3 rounded-xl"
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodoStatus(item._id)}
                />
                <span>{item.text}</span>
              </div>

              <div className="flex gap-3">
                <button onClick={() => editTodo(item._id)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button onClick={() => deleteTodo(item._id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed */}
        <h2 className="text-rose-700 font-medium">Completed</h2>
        <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {doneTodos.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-[#fae6ed]/45 px-4 py-3 rounded-xl"
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodoStatus(item._id)}
                />
                <span className="line-through text-rose-400">
                  {item.text}
                </span>
              </div>

              <button onClick={() => deleteTodo(item._id)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
