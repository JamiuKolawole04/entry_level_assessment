import { NextFunction, Request, Response } from "express";

import { getSessions } from "../api";
import AppError from "../utils/appError";

export const sessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getSessions();

    res.status(200).json({
      response,
    });

    // return next(new AppError(400, "not found"));
  } catch (err: any) {
    if (err.code === "ENOTFOUND" && err.errno === -3008) {
      return next(new AppError(500, "check your network and try again"));
    }

    next(err);
  }
};
