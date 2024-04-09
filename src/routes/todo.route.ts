import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import todoController from "../controllers/todo.controller";
const router = express.Router();

router.get("/", todoController.findAllTodos);
router.get("/search", todoController.searchTodos);
router.get("/:uuid", todoController.findTodoById);
router.post("/", todoController.addTodo);
router.patch("/:uuid", todoController.editTodo);
router.delete("/:uuid", todoController.deleteTodo);

export default router;
