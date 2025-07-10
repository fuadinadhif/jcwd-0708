import express, { Application } from "express";

import todoRoutes from "./routes/todo.route.js";

import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/todos", todoRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT: number = 8000;
app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});
