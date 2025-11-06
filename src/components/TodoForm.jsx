/* eslint-disable react/prop-types */
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [todoInput, setTodoInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      addTodo(todoInput);
      setTodoInput("");
    }
  };

  return (
    <div className="todo-form">
      <label htmlFor="todo-input" className="input-circle"></label>
      <form onSubmit={handleSubmit}>
        <input
          id="todo-input"
          type="text"
          name="todo-input"
          placeholder="Create a new todo..."
          autoComplete="off"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
        />
      </form>
    </div>
  );
}
