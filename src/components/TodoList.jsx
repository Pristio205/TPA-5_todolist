import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeTodo, toggleTodo } from "../redux/reducers/todoReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../assets/Todolist.css"; // Import file CSS untuk styling

function TodoList() {
  const dispatch = useDispatch();
  const [inputTodo, setInputTodo] = useState("");
  const { todos } = useSelector((state) => state.todoReducer);
  const [visibilityFilter, setVisibilityFilter] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: inputTodo,
      isDone: false
    };

    dispatch(addTodo(newTodo));
    setInputTodo("");
  };

  const handleEdit = (id, newText) => {
    dispatch(editTodo({ id, title: newText }));
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleFilterChange = (filter) => {
    setVisibilityFilter(filter);
  };

  const filteredTodos = visibilityFilter === "all"
    ? todos
    : visibilityFilter === "active"
    ? todos.filter((todo) => !todo.isDone)
    : todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <h2>What's the plan for today?</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          type="text" 
          name="todo" 
          placeholder="What to do" 
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
          style={{ width: "312px", height: "34px"}}  
        />
        <button className="add-button"  style={{ width: "60px", height: "34px"}}  >Add</button>
       
      </form>

      <div className="filter-buttons">
        
        <button className={visibilityFilter === "all" ? "active" : ""} onClick={() => handleFilterChange("all")}>All</button>
        <button className={visibilityFilter === "active" ? "active" : ""} onClick={() => handleFilterChange("active")}>Active</button>
        <button className={visibilityFilter === "complete" ? "active" : ""} onClick={() => handleFilterChange("complete")}>Complete</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.isDone ? "completed" : ""}>
            <input 
              type="checkbox" 
              checked={item.isDone}
              onChange={() => handleToggle(item.id)}
            />
            <span>{item.title}</span>
            <div className="buttons">
             <button className="edit-button" onClick={() => handleEdit(item.id, prompt("Enter new text:"))}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="remove-button" onClick={() => handleRemove(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
