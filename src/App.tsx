import { useState } from "react";

type Todo = {
  name: string;
  isCompleted: boolean;
};

const DANH_SACH_TODO_BAN_DAU: Todo[] = [
  {
    name: "Learn Ts",
    isCompleted: true,
  },
  {
    name: "Lear Reactjs",
    isCompleted: false,
  },
  {
    name: "Lear Nodejs",
    isCompleted: false,
  },
  {
    name: "Lear Mysql",
    isCompleted: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(DANH_SACH_TODO_BAN_DAU);
  const [newTodoInput, setNewTodoInput] = useState<string>("");

  const handleNewTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.target.value);
  };

  const handleAddNewTodo = () => {
    if (!newTodoInput) {
    } else {
      if (todos.some((s) => s.name === newTodoInput)) {
        alert("Da ton tai");
      } else {
        const newTodos: Todo[] = [
          ...todos,
          {
            name: newTodoInput,
            isCompleted: false,
          },
        ];

        setTodos(newTodos);
      }
    }
  };

  const handleClickCheckBox = (name: string) => {
    const currentTodoIndex = todos.findIndex((todo) => name === todo.name);

    if (currentTodoIndex != -1) {
      todos[currentTodoIndex].isCompleted = true;

      const newTodos = [...todos];
      setTodos(newTodos);
    }
  };

  const handleClickDelButton = (name: string) => {
    const newTodos = todos.filter((item) => item.name !== name);

    setTodos(newTodos);
  };

  return (
    <div className="container">
      <div className="add_todo_container">
        <input
          type="text"
          value={newTodoInput}
          onChange={(event) => handleNewTodoInputChange(event)}
        />
        <button onClick={handleAddNewTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.name}
            className={todo.isCompleted ? "todo-item " : "todo-item"}
          >
            {!todo.isCompleted && (
              <input
                type="checkbox"
                className="checkbox"
                onClick={() => handleClickCheckBox(todo.name)}
              />
            )}

            <span className={todo.isCompleted ? "todo-done" : ""}>
              {todo.name}
            </span>
            {todo.isCompleted && (
              <button
                onClick={() => handleClickDelButton(todo.name)}
                className="del_btn"
              >
                Xoa
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
