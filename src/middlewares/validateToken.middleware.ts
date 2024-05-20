import jwt, { decode } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class ValidateToken {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const secret = process.env.JWT_SECRET as string;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError(401, "Token is required");
    }

    jwt.verify(token, secret);

    res.locals.decode = jwt.decode(token);

    res.locals.user = await prisma.user.findFirst({
      where: { id: res.locals.decode.id },
    });

    next();
  }
}
