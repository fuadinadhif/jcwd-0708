import express, { Request, Response, Application, NextFunction } from "express";
import productRouter from "./routes/product.route";

const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());

// HEALTH CHECKUP
app.get("/api/v1/health", (request: Request, response: Response) => {
  response
    .status(200)
    .json({ meesage: "API running!", uptime: process.uptime() });
});

// ROUTE MIDDLEWARE
app.use("/api/v1/products", productRouter);

// NOT FOUND MIDDLEWARE
app.use((request: Request, response: Response, next: NextFunction) => {
  response
    .status(404)
    .json({ message: "The route you are looking for does not exist" });
});

// ERROR MIDDLEWARE
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    response.status(500).json({ message: error.message, error: error });
  }
);

const PORT: number = 8000;
app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});

/* ---------------------------------- NOTES --------------------------------- */
// http://localhost:3000/users
// http://localhost:3000/api/v1/users
// http://localhost:3000/api/v2/users

// htpps://purwadhika.com/users
// htpps://purwadhika.com/api/users
// htpps://api.purwadhika.com/users
