import fs from "node:fs/promises";
import path from "node:path";

type logType = "error" | "info" | "warn" | "general";

const logDirectory = path.resolve(process.cwd(), "logs");

export async function logger(message: string, logType: logType) {
  const logFile = path.join(logDirectory, `${logType}.log`);
  const time = new Date().toISOString();

  await fs.appendFile(logFile, `[${time}]: ${message}`);
}
