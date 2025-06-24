"use client";

import { todoData } from "@/data/todo.data";
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(todoData);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  function addTodo(event: React.FormEvent) {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  }

  function toggleDone(id: number) {
    const latestTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });

    setTodos(latestTodos);
  }

  function clearCompleted() {
    const activeTodos = todos.filter((item) => !item.completed);
    setTodos(activeTodos);
  }

  const filteredTodos = todos.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return item.completed;
    } else if (filter === "active") {
      return !item.completed;
    }
  });

  return (
    <>
      <header></header>
      <main className="min-h-screen grid place-items-center">
        <div className="grid gap-4">
          <h1>TODO</h1>

          <form onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Create new todo.."
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
          </form>

          <div>
            {filteredTodos.map((item) => (
              <div key={item.id} className="flex gap-2">
                <button
                  className="border cursor-pointer"
                  onClick={() => toggleDone(item.id)}
                >
                  {item.completed === true ? "Done" : "Not Done"}
                </button>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <p>
              {
                // todos.filter((item) => (item.completed === true ? false : true)).length
                todos.filter((item) => !item.completed).length
              }{" "}
              todos left
            </p>
            <div>
              <button
                className={`${
                  filter === "all" ? "font-bold text-red-500" : ""
                } border`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`${
                  filter === "active" ? "font-bold text-red-500" : ""
                } border`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`${
                  filter === "completed" ? "font-bold text-red-500" : ""
                } border`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <button className="border" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
