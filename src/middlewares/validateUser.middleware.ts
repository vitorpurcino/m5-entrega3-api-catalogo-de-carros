import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import bcrypt from "bcrypt";

export class ValidateUser {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (!user) {
      throw new AppError(404, "User not registered");
    }

    const verifyPassword = await bcrypt.compare(req.body.password, user.password);

    if (verifyPassword) {
        throw new AppError(401, "E-mail and password doesn't match")
    }

    res.locals.user = user

    next();
  }
}
