import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL as string,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
);


export const connectDb = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
