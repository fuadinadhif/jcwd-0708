import fs from "node:fs/promises";

// await fs.writeFile("./message.txt", "Hello from Bandung!");

const result = await fs.readFile("./message.txt", "utf-8");
console.log(result);

/* -------------------------------- COMMONJS -------------------------------- */
// const fs = require("node:fs/promises");

// async function readFile() {
//   const result = await fs.readFile("./message.txt", "utf-8");
//   console.log(result);
// }

// readFile()
