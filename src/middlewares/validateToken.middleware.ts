import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma";

export class ValidateToken {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    const secret = process.env.SECRET as string;

    if (!token) {
      throw new AppError(401, "Token is required");
    }

    jwt.verify(token, secret);

    res.locals.decode = jwt.decode(token);
    res.locals.user = await prisma.user.findFirst({where: {id: res.locals.decode.id}})

    next();
  }
}
