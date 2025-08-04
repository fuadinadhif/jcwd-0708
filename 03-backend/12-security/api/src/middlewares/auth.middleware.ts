import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const accessToken = request.cookies.accessToken;

  if (!accessToken)
    return response
      .status(401)
      .json({ message: "Not authenticated. Please login first" });

  const payload = jwt.verify(accessToken, process.env.JWT_SECRET as string) as {
    id: number;
    email: string;
  };
  request.user = payload;

  next();
}

export function roleGuard() {}
