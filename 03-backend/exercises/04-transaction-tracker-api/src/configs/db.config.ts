import { Pool } from "pg";

const pool = new Pool({
  user: "postgres.geehwnhnzzusdmbfvywa",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  port: 6543,
  password: "newpass",
});

(async () => {
  try {
    await pool.query("SELECT 1");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        nominal NUMERIC(10, 2) NOT NULL,
        type VARCHAR(500) NOT NULL,
        category VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT now()
    );`);

    console.info("Connected to DB");
  } catch (error) {
    console.error(
      `DB connection failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    process.exit(1);
  }
})();

export default pool;
