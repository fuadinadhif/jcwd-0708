import express from "express";
import pool from "./configs/db.config";

const app = express();

app.use(express.json());

// GET ALL ACTORS
app.get("/actors", async (request, response) => {
  try {
    const result = await pool.query(`SELECT * FROM actor`);
    response.status(200).json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error,
    });
  }
});

// CREATE ACTOR
app.post("/actors", async (request, response) => {
  try {
    const { firstName, lastName } = request.body;

    await pool.query(
      `INSER INTO actor (first_name, last_name) VALUES ($1, $2)`,
      [firstName, lastName]
    );

    response.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error,
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
