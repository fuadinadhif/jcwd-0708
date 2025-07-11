import fs from "node:fs/promises";
import { Cashflow } from "../types/cashflow.type.js";

export async function readCashflowFile() {
  const cashflowJSON = await fs.readFile("./data/cashflow.json", "utf-8");
  const cashflow = JSON.parse(cashflowJSON) as Cashflow[];
  return cashflow;
}

export async function writeCashflowFile(data: Cashflow[]) {
  await fs.writeFile("./data/cashflow.json", JSON.stringify(data, null, 2));
}
