import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { Request, Response } from "express";
import { jwtCheck } from "./middlewares/auth";
const app = express();
app.use(jwtCheck);

app.get("/protected", (req, res) => {
  res.json("hello from backend");
});

prisma.$connect().then(() => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000");
  });
});
