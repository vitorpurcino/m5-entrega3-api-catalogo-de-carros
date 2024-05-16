import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import express, { json } from "express";
import { carsRoutes } from "./routes/cars.routes";
import { HandleErrors } from "./middlewares/handleErrors.middlewares";

export const app = express();

app.use(json());
app.use(helmet());
app.use(cors());
app.use("/cars", carsRoutes);
app.use(HandleErrors.execute);
