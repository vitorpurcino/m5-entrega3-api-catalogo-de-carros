import { Router } from "express";
import { container } from "tsyringe";
import { CarsServices } from "../services/cars.services";
import { CarsControllers } from "../controllers/cars.controllers";

container.registerSingleton("CarsServices", CarsServices);
const carsControllers = container.resolve(CarsControllers);

export const carsRoutes = Router();

carsRoutes.post("/", (req, res) => {carsControllers.create(req, res)})
carsRoutes.patch("/:id", (req, res) => {carsControllers.update(req, res)})
carsRoutes.delete("/:id", (req, res) => {carsControllers.delete(req, res)})
carsRoutes.get("/", (req, res) => {carsControllers.getMany(req, res)})
carsRoutes.get("/:id", (req, res) => {carsControllers.getUnique(req, res)})