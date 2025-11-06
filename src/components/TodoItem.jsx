/* eslint-disable react/prop-types */
import { useState } from "react";
import cross from "../assets/icon-cross.svg";

export default function TodoItem({
  children,
  deleteTodo,
  toggleTodo,
  id,
  style,
  isCompleted,
  index,
  draggedItem,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
}) {
  const [show, setShow] = useState(false);

  const toggleChecked = () => {
    toggleTodo(id, !isCompleted);
  };

  const isDragging = draggedItem === index;

  return (
    <li
      className={`todo-item ${isDragging ? "dragging" : ""}`}
      style={style}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      draggable="true"
      onDragStart={() => handleDragStart(index)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
    >
      <div className="checkbox" onClick={toggleChecked}>
        <span className={`checkmark ${isCompleted ? "checked" : ""}`}></span>
      </div>
      <p>{children}</p>
      <button
        className={`todo-delete-btn ${show ? "show" : ""}`}
        onClick={() => deleteTodo(id)}
      >
        <img src={cross} alt="cross icon" />
      </button>
    </li>
  );
}
