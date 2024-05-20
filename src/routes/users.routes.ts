import { container } from "tsyringe";
import { UsersServices } from "../services/users.services";
import { UserControllers } from "../controllers/users.controllers";
import { Router } from "express";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { ValidateBodySchema } from "../middlewares/validateBody.middleware";
import {
  userCreateBodySchema,
  userLoginSchema,
} from "../schemas/users.schemas";
import { ValidateEmail } from "../middlewares/validateEmail.middleware";
import { ValidateUser } from "../middlewares/validateUser.middleware";

container.registerSingleton("UsersServices", UsersServices);
const userControllers = container.resolve(UserControllers);

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  ValidateBodySchema.execute(userCreateBodySchema),
  ValidateEmail.execute,
  (req, res) => {
    userControllers.create(req, res);
  }
);
usersRoutes.post(
  "/login",
  ValidateBodySchema.execute(userLoginSchema),
  ValidateUser.execute,
  (req, res) => {
    userControllers.login(req, res);
  }
);
usersRoutes.get("/", ValidateToken.execute, (req, res) => {
  userControllers.get(req, res);
});
