import express from "express";
const app = express();
const PORT = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
