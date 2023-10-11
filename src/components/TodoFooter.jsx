/* eslint-disable react/prop-types */
// import React from 'react'

export default function TodoFooter({activeCount, showActive, showAll, showCompleted, deleteCompleted }) {
  return (
    <div className="todo-footer">
      <div className="items-count">{activeCount} items left</div>
      <div className="filters">
        <span className="active" onClick={showAll}>All</span>
        <span onClick={showActive}>Active</span>
        <span onClick={showCompleted}>Completed</span>
      </div>
      <div className="clear" onClick={deleteCompleted}>Clear completed</div>
    </div>
  );
}
