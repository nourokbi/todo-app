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
}) {
  // useState is not usefull in every sitiuation when we don't need the component rerender
  // to change other values depend on it
  let check = isCompleted;
  const [show, setShow] = useState(false)

  function toggleChecked() {
    check = !check;
    toggleTodo(id, check);
  }
  function showCross() {
    setShow(true)
  }
  function handleMouseOut() {
    setShow(false)
  }

  return (
    <li
      className="todo-item"
      style={style}
      onMouseOver={showCross}
      onMouseOut={handleMouseOut}
    >
      <div className="checkbox" onClick={toggleChecked}>
        <span className={`checkmark ${check ? "checked" : ""}`}></span>
      </div>
      <p>
      {children}
      </p>
      <button className={`todo-delete-btn ${show ? "show" : ""}`} onClick={() => deleteTodo(id)}>
        <img src={cross} alt="cross icon" />
      </button>
    </li>
  );
}
