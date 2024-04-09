import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import TodoService from "../services.ts/todo.service";

export const findAllTodos = async (req: Request, res: Response) => {
  const { id: userid } = res.locals.userInfo;
  const keyword = req.query.q?.toString();
  try {
    const todos = await TodoService.findAll(userid, keyword);
    res.json({ message: "success", data: todos });
  } catch (error) {
    res.json(error);
  }
};

export const searchTodos = async (req: Request, res: Response) => {
  const { id: userid } = res.locals.userInfo;
  const keyword = req.query.q?.toString();
  try {
    const todos = await TodoService.search(keyword, userid);
    res.json({ message: "success", data: todos });
  } catch (error) {
    res.json({ message: error });
  }
};

export const findTodoById = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { id: userid } = res.locals.userInfo;
  const todos = await TodoService.findById(uuid, userid);
  res.json({ message: "success", data: todos });
};

export const addTodo = async (req: Request, res: Response) => {
  const { title, description, status, deadLine } = req.body;
  const { id: userid } = res.locals.userInfo;
  try {
    const todo = await TodoService.create(
      title,
      description,
      status,
      deadLine,
      userid
    );
    res.json({ message: "success", data: todo });
  } catch (error) {
    res.json({ message: error });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  const { title, description, deadLine, status } = req.body;
  const { uuid } = req.params;
  const { id: userid } = res.locals.userInfo;
  try {
    const todo = await TodoService.edit(
      uuid,
      title,
      description,
      status,
      deadLine,
      userid
    );
    res.json({ message: "success", data: todo });
  } catch (error) {
    res.json({ message: error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { id: userid } = res.locals.userInfo;
  try {
    const todo = await TodoService.deleteTodo(uuid, userid);
    res.json({ message: "success", data: todo });
  } catch (error) {
    res.json({ message: error });
  }
};

export default {
  findAllTodos,
  searchTodos,
  findTodoById,
  addTodo,
  editTodo,
  deleteTodo,
};
