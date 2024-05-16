import { prisma } from "../../database/prisma";
import { createCarBodyMock } from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";
import { request } from "../utils/request";

describe("Integration Test: Get Unique a Car", () => {
  test("Registering and searching by registered car ID", async () => {
    const car = await prisma.cars.create({ data: createCarBodyMock });

    const response = await request
      .get(`/cars/${car.id}`)
      .expect(200)
      .then((response) => response.body);

    carsExpects(response, createCarBodyMock);
  });

  test("Error when searching for vehicle by ID - Car not found", async () => {
    const response = await request
      .get("/cars/2b84a288-be31-44ff-9f88-83a4f41a48aa")
      .expect(404)
      .then((response) => response.body);

    expect(response).toStrictEqual({message: "Car not found."})
  });

});
