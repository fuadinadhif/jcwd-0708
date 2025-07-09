import { URL } from "url";

const myUrl = new URL("https://example.com:8080/page?name=nodejs");

console.log("Host:", myUrl.host); // example.com:8080
console.log("Path:", myUrl.pathname); // /page
console.log("Query:", myUrl.searchParams.get("name")); // nodejs
