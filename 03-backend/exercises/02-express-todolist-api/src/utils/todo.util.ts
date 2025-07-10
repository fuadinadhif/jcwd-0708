import fs from "node:fs/promises";
import { Todo } from "../types/todo.type.js";

export async function readTodosFile() {
  const todosJSON = await fs.readFile("./data/todos.json", "utf-8");
  const todos = JSON.parse(todosJSON) as Todo[];
  return todos;
}

export async function writeTodosFile(data: Todo[]) {
  await fs.writeFile("./data/todos.json", JSON.stringify(data, null, 2));
}
