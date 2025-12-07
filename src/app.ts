import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDb } from "./config/db";
import { authRouter } from "./routes/authentication.route";
import { route } from "./routes/vihicles.route";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config()
connectDb();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", route);
// app.use("/api/v1", userRoute);

export default app;
