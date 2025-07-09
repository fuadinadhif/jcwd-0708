import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, "data", "users.json");

console.log(import.meta.url);
console.log(__filename);
console.log(__dirname);
console.log(usersPath);
