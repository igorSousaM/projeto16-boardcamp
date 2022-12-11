import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "driven",
  database: "boardcamp",
});

export default connection