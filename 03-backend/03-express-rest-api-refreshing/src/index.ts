import express, { Application, Request, Response } from "express";
import fs from "node:fs/promises";
import { CashFlow } from "./types/cash-flow.type.js";

const app: Application = express();

app.get("/api/v1/cash-flow", async (request: Request, response: Response) => {
  try {
    const { startDate, endDate } = request.query;

    const cashFlowJSON = await fs.readFile("./data/cash-flow.json", "utf-8");
    let cashFlow = JSON.parse(cashFlowJSON) as CashFlow[];

    if (startDate && endDate) {
      cashFlow = cashFlow.filter(
        (item) => item.date >= +startDate && item.date <= +endDate
      );
    }

    response.status(200).json(cashFlow);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

const PORT: number = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

/* ---------------------------------- NOTES --------------------------------- */
/*
1. request.url
2. request.files
3. request.cookies
*/
