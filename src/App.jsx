import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Auth from "./components/Auth";
import { API_URL } from "./config";

function App() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [view, setView] = useState("todo");

  useEffect(() => {
    console.log("App using API_URL:", API_URL);
  }, []);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      return null;
    }
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper to get first word of email (before @ and .)
  const profileName = user?.email ? user.email.split("@")[0].split(".")[0] : "";

  const fetchTodos = async (authToken) => {
    try {
      const res = await axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // Map backend format to frontend format
      const mapped = res.data.map((t) => ({
        todo: t.text,
        isCompleted: t.completed,
        _id: t._id,
      }));
      setTodoList(mapped);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        // Token invalid
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };

  const fetchUser = async (authToken) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  // Fetch todos on mount if token exists
  useEffect(() => {
    if (token) {
      fetchTodos(token);
      fetchUser(token); // Ensure user data is fresh
    }
  }, [token]);


  const onInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const addTodo = () => {
    if (currentTodo.trim() === "") return;

    const newItem = {
      todo: currentTodo,
      isCompleted: false,
    };

    if (!token) {
      // Guest mode: Add to local state only
      setTodoList([...todoList, newItem]);
    } else {
      axios
        .post(
          `${API_URL}/api/todos`,
          { text: currentTodo },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          // Backend returns: { _id, text, user, completed, ... }
          const savedItem = {
            todo: res.data.text,
            isCompleted: res.data.completed,
            _id: res.data._id,
          };

          setTodoList((prev) => [...prev, savedItem]); // Use functional update to avoid stale state
        })
        .catch((err) => console.error(err));
    }
    setCurrentTodo("");
  };

  const deleteTodo = (idx) => {
    const itemToDelete = todoList[idx];
    if (token && itemToDelete._id) {
      axios.delete(`${API_URL}/api/todos/${itemToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(err => console.error(err));
    }

    const updated = todoList.filter((_, i) => i !== idx);
    setTodoList(updated);
  };

  const editTodo = (idx) => {
    setCurrentTodo(todoList[idx].todo);
    deleteTodo(idx);
  };

  const toggleTodoStatus = (idx) => {
    const nextTodos = todoList.map((item, i) => {
      if (i === idx) {
        const updatedItem = { ...item, isCompleted: !item.isCompleted };

        if (token && item._id) {
          axios.put(`${API_URL}/api/todos/${item._id}`,
            { text: item.todo, completed: updatedItem.isCompleted },
            { headers: { Authorization: `Bearer ${token}` } }
          ).catch(err => console.error(err));
        }

        return updatedItem;
      }
      return item;
    });
    setTodoList(nextTodos);
  };

  const activeTodos = todoList.filter(t => !t.isCompleted);
  const doneTodos = todoList.filter(t => t.isCompleted);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="
          absolute inset-0 blur-md scale-110
          bg-gradient-to-r
          from-pink-100
          via-rose-200
          via-pink-500
          via-fuchsia-400
          to-pink-100
          animate-radial
        "
      />

      <div className="absolute top-5 right-5 z-50 flex gap-2">
        {view === "todo" && !token && (
          <>
            <button
              onClick={() => setView("login")}
              className="text-rose-900 text-sm font-medium hover:text-rose-700 transition px-3"
            >
              Sign In
            </button>
            <button
              onClick={() => setView("signup")}
              className="
                  bg-rose-900 text-white text-sm
                  px-4 py-2 rounded-full
                  shadow-md hover:bg-rose-800 transition
                "
            >
              Sign Up
            </button>
          </>
        )}
        {token && (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="
                h-10 rounded-full bg-rose-900 text-white 
                flex items-center justify-center font-bold text-sm px-4
                shadow-md hover:scale-105 transition
              "
            >
              {profileName}
            </button>

            {isDropdownOpen && (
              <div
                className="
                  absolute top-12 right-0 
                  bg-white rounded-xl shadow-xl 
                  border border-rose-100
                  w-48 overflow-hidden z-50
                  flex flex-col py-1
                "
              >
                <div className="px-4 py-3 border-b border-rose-50">
                  <p className="text-xs text-rose-500 font-medium">Signed in as</p>
                  <p className="text-sm text-rose-900 truncate font-semibold">{user?.email}</p>
                </div>

                <button
                  onClick={() => {
                    setView("profile");
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-left text-sm text-rose-800 hover:bg-rose-50 transition"
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setTodoList([]);
                    setIsDropdownOpen(false);
                    setView("todo");
                  }}
                  className="px-4 py-2 text-left text-sm text-rose-800 hover:bg-rose-50 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div
          className="
            bg-white/60 backdrop-blur-3xl
            w-[90%] max-w-[520px]
            min-h-[650px]
            p-[32px]
            rounded-[22px]
            shadow-[10px_10px_20px_rgba(197,128,162,0.4)]
          "
        >
          <div className="relative image1">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-rose-200/40 blur-lg rounded-full"></div>
            <img
              src="images/1.png"
              alt="decoration"
              className="w-32 h-32 absolute -top-16 -right-16 opacity-80"
            />
          </div>

          <div className="relative image2">
            <div className="absolute top-120 -left-16 w-22 h-22 bg-rose-200/40 blur-lg rounded-full"></div>
            <img
              src="images/2.png"
              alt="decoration"
              className="w-52 h-52 absolute top-115 -left-28 opacity-100"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-semibold text-rose-900">
                  To-Do List
                </h1>
                <p className="text-[13px] text-rose-300 mt-1">
                  Keep your day calm and organised
                </p>
              </div>
            </div>

            {view === "todo" ? (
              <>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentTodo}
                    onChange={onInputChange}
                    placeholder={token ? "Add a new task..." : "Add a guest task (won't save)..."}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    className="
                      flex-1
                      bg-[#fae6ed]/70
                      outline-none
                      px-4 py-3
                      rounded-xl
                      text-rose-900 text-[15px]
                      placeholder:text-rose-300
                      border border-rose-200/60
                      shadow-inner shadow-white/40
                    "
                  />

                  <button
                    onClick={addTodo}
                    className="
                      flex items-center justify-center
                      px-5
                      rounded-xl
                      text-white
                      bg-gradient-to-r
                      from-[#f7b5ca]
                      via-[#e6a1b7]
                      to-[#d67d99]
                      border border-rose-300/50
                      shadow-md shadow-rose-300/60
                      hover:brightness-105
                      active:brightness-95
                      transition
                    "
                  >
                    <span className="material-symbols-outlined text-xl">
                      send
                    </span>
                  </button>
                </div>
                {!token && (
                  <p className="text-center text-xs text-rose-400 mt-2">
                    Guest mode: Tasks are not saved. <button onClick={() => setView('login')} className="underline font-bold">Sign In</button> to save.
                  </p>
                )}

                <h2 className="text-rose-900 font-medium text-[17px]">
                  Active
                </h2>

                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto custom-scroll">
                  {activeTodos.map((item, i) => {
                    const realIndex = todoList.indexOf(item);

                    return (
                      <div
                        key={i}
                        className="
                      flex items-center justify-between
                      bg-[#fae6ed]/75
                      px-4 py-3
                      rounded-xl
                      border border-rose-200/50
                    "
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleTodoStatus(realIndex)}
                            className="accent-rose-500"
                          />
                          <span className="text-rose-900 text-[15px]">
                            {item.todo}
                          </span>
                        </div>

                        <div className="flex gap-3 text-rose-700">
                          <button onClick={() => editTodo(realIndex)}>
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </button>
                          <button onClick={() => deleteTodo(realIndex)}>
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="h-px bg-rose-200/60"></div>

                <h2 className="text-rose-700 font-medium text-[17px]">
                  Completed
                </h2>

                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto custom-scroll">
                  {doneTodos.map((item, i) => {
                    const realIndex = todoList.indexOf(item);

                    return (
                      <div
                        key={i}
                        className="
                      flex items-center justify-between
                      bg-[#fae6ed]/45
                      px-4 py-3
                      rounded-xl
                      border border-rose-100/40
                    "
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleTodoStatus(realIndex)}
                            className="accent-rose-400"
                          />
                          <span className="line-through text-rose-400 text-[14px]">
                            {item.todo}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteTodo(realIndex)}
                          className="text-rose-400"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

              </>
            ) : view === "profile" ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center gap-4">
                <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center text-xl font-bold shadow-inner border-4 border-white">
                  {profileName}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-rose-900">Your Profile</h2>
                  <p className="text-rose-600 mt-2 font-medium bg-rose-50 px-4 py-2 rounded-lg">
                    {user?.email}
                  </p>
                </div>

                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 w-full mt-4">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-rose-600">Tasks</span>
                    <span className="text-rose-900 font-bold">{todoList.length}</span>
                  </div>
                </div>

                <button
                  onClick={() => setView("todo")}
                  className="mt-4 text-rose-900 hover:underline text-sm font-medium"
                >
                  ← Back to Todos
                </button>
              </div>
            ) : (
              <Auth
                initialIsSignup={view === "signup"}
                onLogin={(newToken, newUser) => {
                  setToken(newToken);
                  setUser(newUser);
                  localStorage.setItem("token", newToken);
                  localStorage.setItem("user", JSON.stringify(newUser));
                  setView("todo");
                  fetchTodos(newToken);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
