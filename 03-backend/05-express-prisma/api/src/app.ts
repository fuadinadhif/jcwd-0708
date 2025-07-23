import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { PrismaClient } from "../generated/prisma";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/* ----------------------------- USER ENDPOINTS ----------------------------- */
// GET ALL USERS
app.get("/users", async (request, response, next) => {
  try {
    const { page = 1, limit = 5 } = request.query;

    // const users = await prisma.user.findMany({
    //   // select: { firstName: true, lastName: true, email: true },
    //   omit: { email: true },
    //   // include: { Post: true },
    // });

    const skip = (Number(page) - 1) * Number(limit);

    const totalUsers = await prisma.user.count();
    const users = await prisma.user.findMany({ take: Number(limit), skip });
    response.status(200).json({
      data: users,
      page: Number(page),
      totalData: totalUsers,
      totalPage: Math.ceil(totalUsers / Number(limit)),
    });
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

/* ----------------------------- POST ENDPOINTS ----------------------------- */
app.get(
  "/posts",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { author } = request.query;
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              User: {
                firstName: { contains: String(author), mode: "insensitive" },
              },
            },
            {
              User: {
                lastName: { contains: String(author), mode: "insensitive" },
              },
            },
          ],
        },
        include: { User: { select: { firstName: true, lastName: true } } },
      });
      response.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
);

/* ----------------------- AGGREGATE ENDPOINTS EXAMPLE ---------------------- */
app.get(
  "/aggregates",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userCount = await prisma.user.aggregate({ _count: true });
      const walletSum = await prisma.wallet.aggregate({
        _sum: { balance: true },
      });

      response.status(200).json({ userCount, walletSum });
    } catch (error) {
      next(error);
    }
  }
);

// ERROR HANDLER
app.use((error, request, response, next) => {
  console.error(error);
  response
    .status(500)
    .json({ message: error.message || "Unknown Error", error });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
