import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "sudahlahpostgres",
  port: 5433,
});

export default pool;
