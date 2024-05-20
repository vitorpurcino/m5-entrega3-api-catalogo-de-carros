import { inject, injectable } from "tsyringe";
import { UsersServices } from "../services/users.services";
import { Request, Response } from "express";

@injectable()
export class UsersControllers {
  constructor(@inject("UsersServices") private services: UsersServices) {}

  async create(req: Request, res: Response) {
    const response = await this.services.create(req.body);  
    return res.status(201).json(response)
  }
  async login(req: Request, res: Response) {
    const response = await this.services.login(res.locals.user);
    return res.status(200).json(response)
  }
  async getUser(req: Request, res: Response) {
    const response = await this.services.getUser(res.locals.user);
    return res.status(200).json(response)
  }
}
