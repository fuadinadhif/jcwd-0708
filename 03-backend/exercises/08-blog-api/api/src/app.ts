import express, { Application } from "express";

const app: Application = express();

const PORT: string = "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
