import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class ValidateIDCar {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const car = await prisma.cars.findFirst({
      where: { id: req.params.id },
    });

    if (!car) {
      throw new AppError(404, "Car not found.");
    }

    if (car.userId !== res.locals.user.id) {
      throw new AppError(403, "User must be the car owner")
    }

    res.locals.car = car;

    next()
  }
}
