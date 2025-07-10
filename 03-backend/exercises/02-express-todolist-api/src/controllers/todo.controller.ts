import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

import { readTodosFile, writeTodosFile } from "../utils/todo.util.js";
import { Todo } from "../types/todo.type.js";

export async function getAllTodos(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const todos = await readTodosFile();
    response.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

export async function getTodoById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const todos = await readTodosFile();
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      return response
        .status(404)
        .json({ message: `Todo with id: ${id} does not exist` });
    }

    response.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { todo } = request.body;

    if (todo === undefined) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    if (typeof todo !== "string") {
      return response.status(400).json({ message: "Invalid input" });
    }

    if (!todo.trim()) {
      return response.status(400).json({ message: "Input cannot be empty" });
    }

    const todos = await readTodosFile();
    const newTodo: Todo = {
      id: uuid(),
      todo,
      completed: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    todos.push(newTodo);
    await writeTodosFile(todos);

    response
      .status(201)
      .json({ message: "Successfully created new todo", todo: newTodo });
  } catch (error) {
    next(error);
  }
}

export async function editTodo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const { todo, completed } = request.body;

    const todos = await readTodosFile();
    const todoIndex = todos.findIndex((item) => item.id === id);

    if (todoIndex === -1) {
      return response
        .status(404)
        .json({ message: `Todo with id: ${id} does not exists` });
    }

    const updatedTodo: Partial<Todo> = { updatedAt: new Date().getTime() };

    if (todo !== undefined) {
      updatedTodo.todo = todo;
    }

    if (completed !== undefined) {
      updatedTodo.completed = completed;
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };

    await writeTodosFile(todos);

    response
      .status(200)
      .json({ message: "Successfully edit todo", todo: todos[todoIndex] });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllTodos(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await writeTodosFile([]);
    response.status(200).json({ message: "Successfully delete all todos" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodoById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const todos = await readTodosFile();
    const remainingTodos = todos.filter((item) => item.id !== id);

    if (todos.length === remainingTodos.length) {
      return response
        .status(404)
        .json({ message: `Todo with id: ${id} does not exist` });
    }

    await writeTodosFile(remainingTodos);

    response.status(200).json({ message: "Successfully deleted todo" });
  } catch (error) {
    next(error);
  }
}
