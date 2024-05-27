import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
  static execute(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {      
      return res.status(400).json(error);
    }

    if (error instanceof JsonWebTokenError) {     
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "internal server error" });
  }
}
