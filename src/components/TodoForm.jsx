/* eslint-disable react/prop-types */
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [todoInput, setTodoInput] = useState("");

  function handleChange(e) {
    setTodoInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    //TODO Add the value in the input to a new todo item
    if (todoInput) {
      addTodo(todoInput);
    }

    setTodoInput("");
  }
  return (
    <div className="todo-form">
        <label htmlFor="todo-input" className="input-circle"></label>
      <form onSubmit={handleSubmit}>
        <input
          id="todo-input"
          type="text"
          name="todo-input"
          placeholder="Create a new todo..."
          onChange={handleChange}
          value={todoInput}
        />
      </form>
    </div>
  );
}
