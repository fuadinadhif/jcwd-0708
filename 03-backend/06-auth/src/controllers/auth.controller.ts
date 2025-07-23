import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(request: Request, response: Response) {
  try {
    const { firstName, lastName, email, password, role } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role },
    });

    response.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: error.message, error });
  }
}

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return response
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return response
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const payload = { email: existingUser.email, role: existingUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    response.status(200).json({ message: "Login success!", token });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: error.message, error });
  }
}
