import { Request, Response } from "express";
import UserService from "../services.ts/user.service";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await UserService.createUser(name, email);
    res.json({ message: "success", data: user });
  } catch (error) {
    res.json({ message: error });
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.findAll();
  res.json({ message: "success", data: users });
};

export const findUserById = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const user = await UserService.findOne(uuid);
  res.json({ message: "success", data: user });
};

export default { registerUser, findAllUsers, findUserById };
