import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
import userController from "../controllers/user.controller";

router.post("/", userController.registerUser);
router.get("/", userController.findAllUsers);
router.get("/:uuid", userController.findUserById);

export default router;
