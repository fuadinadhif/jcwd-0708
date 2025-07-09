import os from "node:os";

console.log("OS Platform:", os.platform());
console.log("Total Memory (GB):", os.totalmem() / 1e9);
console.log("CPU Cores:", os.cpus().length);
