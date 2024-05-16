import { Router } from "express";
import { container } from "tsyringe";
import { CarsServices } from "../services/cars.services";
import { CarsControllers } from "../controllers/cars.controllers";
import { ValidateBodySchema } from "../middlewares/validateBody.middlewares";
import {
  carsCreateBodySchema,
  carsUpdateBodySchema,
} from "../schemas/cars.schemas";
import { ValidateIDCar } from "../middlewares/validateIDCar.middleware";

container.registerSingleton("CarsServices", CarsServices);
const carsControllers = container.resolve(CarsControllers);

export const carsRoutes = Router();

carsRoutes.post(
  "/",
  ValidateBodySchema.execute(carsCreateBodySchema),
  (req, res) => {
    carsControllers.create(req, res);
  }
);
carsRoutes.patch(
  "/:id",
  ValidateIDCar.execute,
  ValidateBodySchema.execute(carsUpdateBodySchema),
  (req, res) => {
    carsControllers.update(req, res);
  }
  
);
carsRoutes.delete("/:id", ValidateIDCar.execute, (req, res) => {
  carsControllers.delete(req, res);
});
carsRoutes.get("/", (req, res) => {
  carsControllers.getMany(req, res);
});
carsRoutes.get("/:id", ValidateIDCar.execute, (req, res) => {
  carsControllers.getUnique(req, res);
});
