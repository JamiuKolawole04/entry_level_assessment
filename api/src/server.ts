require("dotenv").config();

import { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";

import sessionRoute from "./routes/session.route";
import { notFound } from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT;
const corsOptions: cors.CorsOptions = {
  origin: ["https://entry-level.netlify.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// middlewres
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 })
);
app.use(cors(corsOptions));

app.get("/", async (_: Request, res: Response) => {
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
    app.listen(PORT, () => console.log(`Server  listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
