import express from "express";

import authRoutes from "./routes/auth.route.js";
import articleRoutes from "./routes/article.route.js";

const app = express(); // Create server

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

const PORT = "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
