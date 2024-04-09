import { RequestHandler } from "express";
import userService from "../services.ts/user.service";
import { jwtDecode } from "jwt-decode";

export const getUserInfo: RequestHandler = async (req: any, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const decoded: any = jwtDecode(token);
    const { nickname, email } = decoded;
    const localUserInfo = await userService.findFirstOrCreate(nickname, email);
    res.locals.userInfo = localUserInfo;
    next();
  } catch (error) {
    res.json(error);
  }
};
