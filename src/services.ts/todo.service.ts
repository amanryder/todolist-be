import { status } from "./../constants";
import { PrismaClient, Status } from "@prisma/client";
const prisma = new PrismaClient();

const findAll = async (userid: number, keyword: string | undefined) => {
  let todos = [];

  if (keyword != "") {
    todos = await prisma.todos.findMany({
      where: {
        title: {
          search: keyword,
        },
        ownerId: userid,
        description: {
          search: keyword,
        },
      },
    });
  } else {
    todos = await prisma.todos.findMany({
      where: {
        ownerId: userid,
      },
    });
  }
  return todos;
};

const search = async (keyword: string | undefined, userid: number) => {
  const todos = await prisma.todos.findMany({
    where: {
      title: {
        search: keyword,
      },
      ownerId: userid,
      description: {
        search: keyword,
      },
    },
  });

  return todos;
};

const findById = async (uuid: string, userid: number) => {
  const todos = await prisma.todos.findFirst({
    where: {
      rowguid: uuid,
      ownerId: userid,
    },
  });

  return todos;
};

const create = async (
  title: string,
  description: string,
  status: Status,
  deadLine: string,
  userid: number
) => {
  const todo = await prisma.todos.create({
    data: {
      title: title,
      description: description,
      deadLine: deadLine,
      status: status,
      owner: {
        connect: {
          id: userid,
        },
      },
    },
  });

  return todo;
};

const edit = async (
  uuid: string,
  title: string,
  description: string,
  status: Status,
  deadLine: Date,
  userid: number
) => {
  const todo = await prisma.todos.update({
    where: {
      rowguid: uuid,
    },
    data: {
      title: title,
      description: description,
      deadLine: deadLine,
      status: status,
      owner: {
        connect: {
          id: userid,
        },
      },
    },
  });
};

const deleteTodo = async (uuid: string, userid: number) => {
  const todo = await prisma.todos.delete({
    where: {
      status: "TODO",
      rowguid: uuid,
      ownerId: userid,
    },
  });
  return todo;
};

export default { findAll, search, findById, create, edit, deleteTodo };
