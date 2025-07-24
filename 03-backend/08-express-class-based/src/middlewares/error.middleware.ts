import { logger } from "@/utils/logger.js";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@/generated/prisma/index.js";
import { AppError } from "@/errors/app.error.js";

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error);
  logger(error.message, "error");

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return response
      .status(400)
      .json({ message: error.message, code: error.code });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  response
    .status(500)
    .json({ message: error.message || "Genaral error. Good luck!", error });
}
