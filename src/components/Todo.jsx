import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TODOS");
    return localValue ? JSON.parse(localValue) : [];
  });
  const [tempTodos, setTempTodos] = useState([...todos]);
  const [show, setShow] = useState("all");
  const [draggedItem, setDraggedItem] = useState(null);

  // Edit Todos (add, delete, change status)
  const addTodo = (val) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100000),
      title: val,
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id, checked) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: checked } : todo
      )
    );
  };

  // Drag and drop handlers
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedItem === null) return;

    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(draggedItem, 1);
    updatedTodos.splice(dropIndex, 0, draggedTodo);

    setTodos(updatedTodos);
    setDraggedItem(null);
  };

  // Filter todos based on current view
  useEffect(() => {
    if (show === "active") {
      setTempTodos(todos.filter((todo) => !todo.isCompleted));
    } else if (show === "completed") {
      setTempTodos(todos.filter((todo) => todo.isCompleted));
    } else {
      setTempTodos([...todos]);
    }
  }, [todos, show]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  // Functions to be passed to TodoFooter Component
  const calcActive = () => todos.filter((todo) => !todo.isCompleted).length;
  const showAll = () => setShow("all");
  const showActive = () => setShow("active");
  const showCompleted = () => setShow("completed");
  const deleteCompleted = () =>
    setTodos(todos.filter((todo) => !todo.isCompleted));

  return (
    <div className="container">
      <div className="todo">
        <TodoForm addTodo={addTodo} />
        {tempTodos.length > 0 ? (
          <TodoList>
            {tempTodos.map((todo, index) => (
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
                index={index}
                draggedItem={draggedItem}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              >
                {todo.title}
              </TodoItem>
            ))}
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
          currentFilter={show}
        />
      </div>
    </div>
  );
}
