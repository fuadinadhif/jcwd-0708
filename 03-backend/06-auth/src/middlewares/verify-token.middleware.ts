import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export async function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  const user = await jwt.verify(token, process.env.JWT_SECRET as string);

  console.log(user);

  request.user = user;

  next();
}
