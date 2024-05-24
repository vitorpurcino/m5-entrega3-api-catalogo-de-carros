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
  async create(body: TCreateBodyCars): Promise<TCars> {
    const response = await prisma.cars.create({ data: body });
    return response;
  }
  async getMany(userId?: string): Promise<TCars[]> {
    let response;
    if (userId) {
      response = await prisma.cars.findMany({
        where: { userId: userId },
        include: { user: true },
      });
    } else {
      response = await prisma.cars.findMany();
    }
    return response;
  }
  async getUnique(carId: string): Promise<TCars> {
    const response = await prisma.cars.findFirst({ where: { id: carId } });
    return carsSchemas.parse(response);
  }
  async update(body: TUpdateBodyCars, carId: string): Promise<TCars> {
    const response = await prisma.cars.update({
      data: body,
      where: { id: carId },
      include: {user: true}
    });

    return response;
  }
  async delete(carId: string) {
    await prisma.cars.delete({ where: { id: carId } });
  }
}
