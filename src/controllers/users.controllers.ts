import { inject, injectable } from "tsyringe";
import { UsersServices } from "../services/users.services";
import { Request, Response } from "express";

@injectable()
export class UserControllers {
  constructor(@inject("UserServices") private services: UsersServices) {}

  async create(req: Request, res: Response) {
    const response = this.services.create(req.body);
    return res.status(201).json(response)
  }
  async login(req: Request, res: Response) {
    const response = this.services.login(req.body);
    return res.status(200).json(response)
  }
  async get(req: Request, res: Response) {
    const response = this.services.create(res.locals.user);
    return res.status(200).json(response)
  }
}
