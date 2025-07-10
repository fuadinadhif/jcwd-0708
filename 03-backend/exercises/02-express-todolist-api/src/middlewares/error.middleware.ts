import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error);
  response.status(500).json({ message: error.message, error });
}
