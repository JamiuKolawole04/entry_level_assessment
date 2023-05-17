require("dotenv").config();

import { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { set } from "mongoose";

import sessionRoute from "./routes/session.route";
import { connectDB } from "./db/db";
import { notFound } from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT;

// middlewres
set("strictQuery", false);
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 })
);
app.use(cors());

app.get("/", async (_, res: Response) => {
  res.status(200).json({
    sucess: true,
    message: "server on!",
  });
});

app.use("/api/sessions", sessionRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

// starting server
const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI!);
    console.log("db connected");

    app.listen(PORT, () => console.log(`Server  listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
