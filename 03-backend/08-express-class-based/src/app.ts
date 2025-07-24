import express, { Application } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(express.json());
  }

  setupRoutes() {
    this.app.use("/api/auth", authRoutes);
  }

  setupErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen(port: string) {
    this.app.listen(port, () =>
      console.info(`Server is listening on port: ${port}`)
    );
  }
}
