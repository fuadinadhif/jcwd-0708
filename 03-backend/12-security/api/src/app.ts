import express, { Application, NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { verifyToken } from "./middlewares/auth.middleware.js";

import { prisma } from "./configs/prisma.config.js";
import { rateLimitOptions } from "./configs/express-rate-limit.config.js";
import { corsOptions } from "./configs/cors.config.js";
import { sanitize } from "./configs/xss.config.js";
import { helmetOptions } from "./configs/helmet.config.js";

const app: Application = express();

app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));
app.use(sanitize);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (request: Request, response: Response) => {
  response.status(200).json({
    message: "API is running",
    uptime: `${process.uptime().toFixed(2)} seconds`,
  });
});

/* ---------------------------------- LOGIN --------------------------------- */
app.post(
  "/api/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (!existingUser)
        return response.status(400).json({ message: "Invalid credentials" });

      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isValidPassword)
        return response.status(400).json({ message: "Invalid credentials" });

      const payload = { id: existingUser.id, email: existingUser.email };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });
      response.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/logout",
  (request: Request, response: Response, next: NextFunction) => {
    response.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });
    request.user = null;

    response.status(200).json({ message: "Logged out successfully" });
  }
);

/* --------------------------------- PUBLIC --------------------------------- */
app.get(
  "/api/public",
  (request: Request, response: Response, next: NextFunction) => {
    response
      .status(200)
      .json({ message: "Public route. You can see this without login" });
  }
);

/* -------------------------------- PROTECTED ------------------------------- */
app.get(
  "/api/protected",
  verifyToken,
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({
      message:
        "Protected route. You have to login first before you can see this",
    });
  }
);

app.post(
  "/api/article",
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    const { title, content } = request.body;
    const currentUser = request.user;

    if (!currentUser) {
      return response
        .status(401)
        .json({ message: "You are not allowed to do this" });
    }

    await prisma.article.create({
      data: { title, content, userId: currentUser.id },
    });
  }
);

/* ---------------------------- ERROR MIDDLEWARE ---------------------------- */
app.use(
  (
    error: unknown,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.error(error);
    response.status(500).json({
      message:
        error instanceof Error ? error.message : "Unknown error. Good luck",
    });
  }
);

const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
