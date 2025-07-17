import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function getAllUsers(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const users = await prisma.user.findMany({ include: { Post: true } });
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  request: Request,
  response: Response,
  next: NextFunction
) {
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
}

export async function getUserPosts(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const posts = await prisma.post.findMany({ where: { userId: id } });

    response.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
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
}

export async function deleteUserById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    await prisma.user.delete({ where: { id } });

    response.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}
