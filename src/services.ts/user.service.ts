import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (name: string, email: string) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });

  return user;
};

const findAll = async () => {
  const users = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });
  return users;
};

const findOne = async (uuid: string) => {
  const user = await prisma.user.findFirst({
    where: {
      rowguid: uuid,
    },
    include: {
      todos: true,
    },
  });
  return user;
};

const findFirstOrCreate = async (name: string, email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user ? user : await createUser(name, email);
};

export default { createUser, findAll, findOne, findFirstOrCreate };
