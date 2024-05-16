import express, { json } from "express";
import { carsRoutes } from "./routes/cars.routes";
import { HandleErrors } from "./middlewares/handleErrors.middlewares";
import helmet from "helmet";
import cors from "cors";

export const app = express();

app.use(json());
app.use(helmet());
app.use(cors())
app.use("/cars", carsRoutes)
app.use(HandleErrors.execute)