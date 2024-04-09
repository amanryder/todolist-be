import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Request, Response } from "express";
import { jwtCheck } from "./middlewares/auth";
import { errorHandler } from "./middlewares/error";
import { getUserInfo } from "./middlewares/user-info";
import { mainRouter } from "./routes";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(jwtCheck);
app.use(express.json());
app.use(errorHandler);
app.use(getUserInfo);
app.use(mainRouter);

app.get("/protected", (req, res) => {
  res.json("hello from backend");
});

prisma.$connect().then(() => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000");
  });
});
