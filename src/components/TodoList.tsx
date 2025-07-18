import React, { useState } from "react";
import { TodoTypes } from "../todo";
import TodoService from "../TodoService";
import TodoForm from "./TodoForm";
import { FaCheck, FaTimes } from "react-icons/fa";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <TodoForm setTodos={setTodos} />
      <div></div>
      {todos.map((todo) => (
        <div className="items" key={todo.id}>
          {editedTodoId === todo.id ? (
            <div className="editedText">
              <input
                type="text"
                value={editedTodoText}
                onChange={(e) => setEditedTodoText(e.target.value)}
                autoFocus
              />
              <button onClick={() => handleEditSave(todo.id)}>
                <FaCheck />
              </button>
              <button onClick={handleEditCancel}>
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="todoText">
              <span>{todo.text}</span>
              <button
                onClick={() => handleEditStart(todo.id, todo.text)}
                className="edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
