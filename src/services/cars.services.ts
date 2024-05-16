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
  async getMany(): Promise<TCars[]> {
    const response = await prisma.cars.findMany();
    return response;
  }
  async getUnique(carId: string): Promise<TCars> {
    const response = await prisma.cars.findFirst({ where: { id: carId } });
    return carsSchemas.parse(response);
  }
  async update(body: TUpdateBodyCars, carId: string): Promise<TCars> {
    const car = await prisma.cars.findFirst({ where: { id: carId } });
    const updateCar = { ...car, ...body };

    const response = await prisma.cars.update({
      where: { id: carId },
      data: updateCar,
    });

    return response;
  }
  async delete(carId: string) {
    await prisma.cars.delete({ where: { id: carId } });
  }
}
