import { useState } from "react";
import Todo from "./todo";

import "./todoApp.css"

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  function handleChange(event) {
    const value = event.target.value;
    setTitle(value);
  }
  console.log(title);

  function hadleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false,
    };

    // const temp = [...todos];
    // temp.unshift(newTodo);

    if (title === "") {
      alert("please, enter task's name")
      return
    }

const newList = [newTodo, ...todos]

    localStorage.setItem("todos", JSON.stringify( newList))
    setTodos(newList);

    setTitle("")
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id !== id);

    setTodos (temp)
  }


  const todosList = JSON.parse( localStorage.getItem("todos")) ?? []
  console.log(todosList);

  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={hadleSubmit}>
        <input onChange={handleChange} className="todoInput" value={title} placeholder="Task's name" />
        <input
          onClick={hadleSubmit}
          type="submit"
          value="Create todo"
          className="buttonCreate"
        />
      </form>

      <div className="todosContianer">
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
