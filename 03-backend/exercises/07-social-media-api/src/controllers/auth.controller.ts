import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function register(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, age, email, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return response
        .status(409)
        .json({ message: "User with this email already exist" });
    }

    await prisma.user.create({
      data: { firstName, lastName, age, email, password },
    });

    response.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
}

export async function login(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { email, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return response.status(404).json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return response.status(400).json({ message: "Password not matched" });
    }

    response.status(200).json({ message: "Login success" });
  } catch (error) {
    next(error);
  }
}
