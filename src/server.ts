import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { connectDb } from "./config/db";

const port = process.env.PORT || 4000;


connectDb();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
