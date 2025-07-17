import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    response
      .status(500)
      .json({ message: error.message || "Unknown Error", error });
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
