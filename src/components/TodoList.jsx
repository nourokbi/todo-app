/* eslint-disable react/prop-types */
// import React from 'react'

export default function TodoList({ children}) {

  return (
    <ul className="todo-list">
      {children}
    </ul>
  );
}
