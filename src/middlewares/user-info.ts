import axios from "axios";
import { RequestHandler } from "express";
import userService from "../services.ts/user.service";

export const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const userInfo = await requestUserInfo(token as string);
    const { nickname, email } = userInfo.data;
    const localUserInfo = await userService.findFirstOrCreate(nickname, email);
    res.locals.userInfo = localUserInfo;
    next();
  } catch (error) {
    res.json(error);
  }
};

const requestUserInfo = async (token: string) => {
  const user = await axios.get("https://dev-l1hhkali.us.auth0.com/userinfo", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return user;
};
