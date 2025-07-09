import express, { Request, Response, Application, NextFunction } from "express";
import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";
import { readUsersFile } from "./utils/user.util.js";

const app: Application = express();

app.use(express.json());

app.get(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await readUsersFile();
      response.status(200).json(users);
      response.status(200).json({ message: "DOUBLE" });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/users/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const users = await readUsersFile();
      const user = users.find((item) => item.id === id);
      if (!user) {
        response.status(404).json({ message: "User not found" });
        return;
      }

      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, email } = request.body;

      if (!name || !email) {
        response.status(400).json({ message: "Missing required credentials" });
        return;
      }

      const users = await readUsersFile();

      const emailExists = users.some((item) => item.email === email);
      if (emailExists) {
        response.status(400).json({ message: "Email already exist" });
        return;
      }

      const newUser = { id: uuid(), name, email };

      users.push(newUser);
      await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

      response
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/users/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const { email, name } = request.body;

      if (!name || !email) {
        response.status(400).json({ message: "Missing required credentials" });
        return;
      }

      const users = await readUsersFile();
      const userIndex = users.findIndex((item) => item.id === id);

      if (userIndex === -1) {
        response.status(404).json({ message: "User not found" });
        return;
      }

      users[userIndex] = { ...users[userIndex], name, email };

      await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
      response.status(200).json({
        message: "User updated successfully",
        user: { ...users[userIndex] },
      });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/users/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const users = await readUsersFile();
      const user = users.find((item) => item.id === id);

      if (!user) {
        response.status(404).json({ message: "User not found" });
        return;
      }

      const filteredUser = users.filter((item) => item.id !== id);
      await fs.writeFile(
        "./data/users.json",
        JSON.stringify(filteredUser, null, 2)
      );

      response.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      next(error);
    }
  }
);

app.use(
  async (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.error(error);

    response.status(500).json({
      message:
        error instanceof Error ? error.message : "Unknown error. Good luck!",
      error,
    });
  }
);

const PORT: number = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
