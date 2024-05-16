import { prisma } from "../../database/prisma";
import {
  bodyInvalidMock,
  carUpdateBodyMock,
  createCarBodyMock,
} from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";
import { request } from "../utils/request";

describe("Integration Test: Update a Car", () => {
  test("Registering a new car", async () => {
    const car = await prisma.cars.create({ data: createCarBodyMock });
    const response = await request
      .patch(`/cars/${car.id}`)
      .send(carUpdateBodyMock)
      .expect(200)
      .then((response) => response.body);

    carsExpects(response, carUpdateBodyMock);
  });

  test("Body error when trying to update car - Error 400", async () => {
    const car = await prisma.cars.create({ data: createCarBodyMock });

    const response = await request
      .patch(`/cars/${car.id}`)
      .send(bodyInvalidMock)
      .expect(400)
      .then((response) => response.body);

    expect(response.name).toStrictEqual("ZodError");
  });

  test("Error when searching for vehicle by ID - Car not found", async () => {
    const response = await request
      .patch("/cars/2b84a288-be31-44ff-9f88-83a4f41a48aa")
      .send(carUpdateBodyMock)
      .expect(404)
      .then((response) => response.body);

    expect(response).toStrictEqual({message: "Car not found."})
  });
});
