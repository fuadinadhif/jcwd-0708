import http from "http";
import users from "../data/users.json";
import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";

const server = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;

  // GET
  if (method === "GET" && url === "/users") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(users));
  }

  // POST
  else if (method === "POST" && url === "/users") {
    let body = "";

    request.on("data", (chunk) => {
      return (body = body + chunk);
    });
    request.on("end", async () => {
      const { name, email } = JSON.parse(body);
      const users = await fs.readFile("./data/users.json", "utf-8");
      const parsedUsers = JSON.parse(users);
      const newUser = { id: uuid(), name, email };

      parsedUsers.push(newUser);

      await fs.writeFile(
        "./data/users.json",
        JSON.stringify(parsedUsers, null, 2)
      );
      response.writeHead(201, { "content-type": "application/json" });
      response.end(JSON.stringify({ message: "User created" }));
    });
  }

  // NOT FOUND
  else {
    response.writeHead(404);
    response.end("Route not found");
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});
