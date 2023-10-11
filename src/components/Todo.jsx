import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TODOS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [tempTodos, setTempTodos] = useState([...todos]);
  const [show, setShow] = useState("all");

  // edit Todos (add, delete, change status)
  function addTodo(val) {
    const newTodo = {
      id: Math.floor(Math.random() * 100000),
      title: val,
      isCompleted: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }
  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  }
  function toggleTodo(id, checked) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: checked };
        }
        return todo;
      })
    );
  }
  // shown Todos
  function filteredTodos(t) {
    if (show === "active") {
      t = todos.filter((todo) => !todo.isCompleted);
    } else if (show === "completed") {
      t = todos.filter((todo) => todo.isCompleted);
    } else {
      t = [...todos];
    }
    setTempTodos(t);
  }

  // Functions to be passed to TodoFooter Component
  function calcActive() {
    let activeCount = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted === false) {
        activeCount++;
      }
    }
    return activeCount;
  }
  function showAll() {
    setShow("all");
  }
  function showActive() {
    setShow("active");
  }
  function showCompleted() {
    setShow("completed");
  }
  function deleteCompleted() {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  }

  // assign shown todos every render
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
    filteredTodos();
  }, [todos, show]);

  return (
    <div className="container">
      <div className="todo">
        <TodoForm addTodo={addTodo} />
        {tempTodos.length > 0 ? (
          <TodoList>
            {tempTodos.map((todo) => {
              return (
                <TodoItem
                  style={
                    todo.isCompleted
                      ? {
                          textDecoration: "line-through",
                          color: "hsl(233, 14%, 35%)",
                        }
                      : null
                  }
                  id={todo.id}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  key={todo.id}
                  isCompleted={todo.isCompleted}
                >
                  {todo.title}
                </TodoItem>
              );
            })}
          </TodoList>
        ) : (
          <div className="todo-list">
            <div className="no-todo">
              <div className="input-circle"></div>
              No Todos
            </div>
          </div>
        )}
        <TodoFooter
          activeCount={calcActive()}
          showActive={showActive}
          showAll={showAll}
          showCompleted={showCompleted}
          deleteCompleted={deleteCompleted}
        />
      </div>
    </div>
  );
}
