import { NextFunction, Request, Response } from "express";

import { getSessions } from "../api";
import AppError from "../utils/appError";
import { Session } from "../api";

export const sessions = async (
  req: Request<
    { short_title?: string; status?: string },
    { sucess: boolean; message: string; sessions: Session },
    {}
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessions = await getSessions();

    res.status(200).json({
      success: true,
      message: "sessions fetched successfully",
      sessions,
    });

    // return next(new AppError(400, "not found"));
  } catch (err: any) {
    if (err.code === "ENOTFOUND" && err.errno === -3008) {
      return next(
        new AppError(500, "check your internet connection and try again")
      );
    }

    next(err);
  }
};
