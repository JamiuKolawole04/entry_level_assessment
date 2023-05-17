import { NextFunction, Request, Response } from "express";

import { getSessions } from "../api";
import AppError from "../utils/appError";
import { Session } from "../api";

interface ResponseObj {
  success: boolean;
  message: string;
  sessions: Session[];
}

export const sessions = async (
  req: Request<{}, ResponseObj, {}, { short_title?: string; status?: string }>,
  res: Response<ResponseObj>,
  next: NextFunction
) => {
  try {
    let sessions = await getSessions();
    const { short_title, status } = req.query;

    if (short_title) {
      sessions = sessions.filter((el) => {
        return el.program.some((program) => {
          return program.short_title === short_title;
        });
      });
    }

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
