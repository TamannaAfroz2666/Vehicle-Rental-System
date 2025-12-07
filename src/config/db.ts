import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDb = async (): Promise<void>  => {
  try {
    await pool.query("SELECT NOW()");
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error(" Database connection failed:", error);
    process.exit(1);
  }
};
