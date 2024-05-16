import { prisma } from "../../database/prisma";
import { createCarBodyMock } from "../mocks/cars.mock";
import { request } from "../utils/request";

describe("Integration Test: Delete a Car", () => {
  test("Registering and removing a car from the database", async () => {
    const car = await prisma.cars.create({ data: createCarBodyMock });

    const response = await request
      .delete(`/cars/${car.id}`)
      .expect(204)
      .then((response) => response.body);
      
  });

  test("Error when searching for vehicle by ID - Car not found", async () => {
    const response = await request
      .delete("/cars/2b84a288-be31-44ff-9f88-83a4f41a48aa")
      .expect(404)
      .then((response) => response.body);

    expect(response).toStrictEqual({ message: "Car not found." });
  });
});
