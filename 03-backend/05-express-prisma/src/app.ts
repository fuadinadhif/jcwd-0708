import "dotenv/config";

import express, { response } from "express";

import { PrismaClient } from "../generated/prisma";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET ALL USERS
app.get("/users", async (request, response, next) => {
  try {
    const users = await prisma.user.findMany({ include: { Post: true } });
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET USER BY ID
app.get("/users/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return response
        .status(404)
        .json({ message: `User with id: ${id} does not exist` });
    }

    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// CREATE USER
app.post("/users", async (request, response, next) => {
  try {
    const { firstName, lastName, age, email } = request.body;

    await prisma.user.create({
      data: { firstName, lastName, age, email },
    });

    response.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
});

// EDIT USER
app.put("/users/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const { firstName, lastName, age, address, email } = request.body;

    await prisma.user.update({
      data: { firstName, lastName, age, address, email },
      where: { id },
    });

    response.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
});

// DELETE USER
app.delete("/users/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    await prisma.user.delete({ where: { id } });

    response.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

// ERROR HANDLER
app.use((error, request, response, next) => {
  console.error(error);
  response
    .status(500)
    .json({ message: error.message || "Unknown Error", error });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
