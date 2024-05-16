import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import express, { json } from "express";
import { carsRoutes } from "./routes/cars.routes";
import { HandleErrors } from "./middlewares/handleErrors.middlewares";

export const app = express();

app.use(json());
app.use("/cars", carsRoutes);
app.use(HandleErrors.execute);
