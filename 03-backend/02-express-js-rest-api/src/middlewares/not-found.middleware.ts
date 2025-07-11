import { Request, Response, NextFunction } from "express";

export async function notFoundMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response
    .status(404)
    .json({ message: "The route you are looking for does not exist" });
}
