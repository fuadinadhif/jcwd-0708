import express from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteTodoById,
  editTodo,
  getAllTodos,
  getTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo).delete(deleteAllTodos);
router.route("/:id").get(getTodoById).put(editTodo).delete(deleteTodoById);

export default router;
