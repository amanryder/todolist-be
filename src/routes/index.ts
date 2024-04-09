import { Router } from "express";
import userRoute from "./user.route";
import todoRoute from "./todo.route";

const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/todos", todoRoute);

export { mainRouter };
