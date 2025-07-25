import express, { Application, Request, Response } from "express";
import rateLimit from "express-rate-limit";

import { prisma } from "./configs/prisma.config.js";

const app: Application = express();

// app.use(rateLimit({ windowMs: 5000, limit: 1 }));

app.get("/api/health", (request: Request, response: Response) => {
  response.status(200).json({
    message: "API is running",
    uptime: `${process.uptime().toFixed(2)} seconds`,
  });
});

app.get("/api/users", async (request: Request, response: Response) => {
  const users = await prisma.user.findMany();
  response.status(200).json(users);
});

app.get("/api/pokemons", async (request: Request, response: Response) => {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemonsData = await pokemons.json();

  response.status(200).json(pokemonsData);
});

const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

export default app;
