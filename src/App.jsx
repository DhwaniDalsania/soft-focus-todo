import { useState } from "react";
import "./App.css";

function App() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const addTodo = () => {
    if (currentTodo.trim() === "") return;

    const newItem = {
      todo: currentTodo,
      isCompleted: false,
    };

    setTodoList([...todoList, newItem]);
    setCurrentTodo("");
  };

  const deleteTodo = (idx) => {
    const updated = todoList.filter((_, i) => i !== idx);
    setTodoList(updated);
  };

  const editTodo = (idx) => {
    setCurrentTodo(todoList[idx].todo);
    deleteTodo(idx);
  };

  const toggleTodoStatus = (idx) => {
    const nextTodos = todoList.map((item, i) =>
      i === idx ? { ...item, isCompleted: !item.isCompleted } : item
    );
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
              src="src\\assets\\1.png"
              alt="decoration"
              className="w-32 h-32 absolute -top-16 -right-16 opacity-80"
            />
          </div>

          <div className="relative image2">
            <div className="absolute top-120 -left-16 w-22 h-22 bg-rose-200/40 blur-lg rounded-full"></div>
            <img
              src="/src/assets/2.png"
              alt="decoration"
              className="w-52 h-52 absolute top-115 -left-28 opacity-100"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-semibold text-rose-900">
                To-Do List
              </h1>
              <p className="text-[13px] text-rose-300 mt-1">
                Keep your day calm and organised
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={currentTodo}
                onChange={onInputChange}
                placeholder="Add a new task…"
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

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
