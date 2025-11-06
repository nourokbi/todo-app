/* eslint-disable react/prop-types */

export default function TodoFooter({
  activeCount,
  showActive,
  showAll,
  showCompleted,
  deleteCompleted,
  currentFilter,
}) {
  return (
    <div className="todo-footer">
      <div className="items-count">{activeCount} items left</div>
      <div className="filters">
        <span
          className={currentFilter === "all" ? "active" : ""}
          onClick={showAll}
        >
          All
        </span>
        <span
          className={currentFilter === "active" ? "active" : ""}
          onClick={showActive}
        >
          Active
        </span>
        <span
          className={currentFilter === "completed" ? "active" : ""}
          onClick={showCompleted}
        >
          Completed
        </span>
      </div>
      <div className="clear" onClick={deleteCompleted}>
        Clear completed
      </div>
    </div>
  );
}
