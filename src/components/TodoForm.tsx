import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import { TodoTypes } from "../todo";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText.trim());
      setTodos((prevTodos) => [...prevTodos, newTodo]); // FIXED
      setNewTodoText("");
    }
  };

  return (
    <div className="todoForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoForm;
