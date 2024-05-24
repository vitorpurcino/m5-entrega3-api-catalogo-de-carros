import { inject, injectable } from "tsyringe";
import { CarsServices } from "../services/cars.services";
import { Request, Response } from "express";

@injectable()
export class CarsControllers {
  constructor(@inject("CarsServices") private services: CarsServices) {}

  async create(req: Request, res: Response) {
    const response = await this.services.create(req.body);
    return res.status(201).json(response)
  }
  async getUnique(req: Request, res: Response) {
    return res.status(200).json(res.locals.car)
  }
  async getMany(req: Request, res: Response) {
    const response = await this.services.getMany(req.params.userId);
    return res.status(200).json(response)
  }
  async update(req: Request, res: Response) {
    const response = await this.services.update(req.body, res.locals.car.id);
    return res.status(200).json(response)
  }
  async delete(req: Request, res: Response) {
    const response = await this.services.delete(req.params.id);
    return res.status(204).json(response)
  }
}
