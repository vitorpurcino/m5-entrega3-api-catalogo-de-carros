import "reflect-metadata";
import { injectable } from "tsyringe";
import {
  TCars,
  TCreateBodyCars,
  TUpdateBodyCars,
  carsSchemas,
} from "../schemas/cars.schemas";
import { prisma } from "../database/prisma";

@injectable()
export class CarsServices {
  async create(body: TCreateBodyCars, userId: string): Promise<TCars> {
    const newCar = { ...body, userId: userId };
    const response = await prisma.cars.create({ data: newCar });
    return response;
  }
  async getMany(userId?: string): Promise<TCars[]> {
    let response;
    if (userId) {
      response = await prisma.cars.findMany({
        where: { user: { id: userId } },
        include: { user: true },
      });
    } else {
      response = await prisma.cars.findMany();
    }
    return response;
  }
  async getUnique(car: TCars): Promise<TCars> {
    return car;
  }
  async update(body: TUpdateBodyCars, carId: string): Promise<TCars> {
    const response = await prisma.cars.update({
      data: body,
      where: { id: carId },
      include: { user: true },
    });

    return response;
  }
  async delete(carId: string) {
    await prisma.cars.delete({ where: { id: carId } });
  }
}
