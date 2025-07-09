import express from "express";
import users from "../data/users.json";
import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";

const server = express();

// MIDDLEWARES
server.use(express.json());

// GET
server.get("/users", (request, response) => {
  response.status(200).json(users);
});

// POST
server.post("/users", async (request, response) => {
  const { email, name } = request.body;
  const users = await fs.readFile("./data/users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  const newUser = { id: uuid(), name, email };

  parsedUsers.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(parsedUsers, null, 2));

  response.status(201).json({ message: "User created successfully" });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});
