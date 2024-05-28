import { prisma } from "../../database/prisma";
import { createCarBodyMock2, userId } from "../mocks/cars.mock";
import { createUserLogin } from "../utils/createUserLogin";
import { request } from "../utils/request";

describe("Integration Test: Delete a Car", () => {
  test("Registering and removing a car from the database", async () => {
    const usuario = await createUserLogin();
    const newCar = { ...createCarBodyMock2, userId: usuario.user.id };
    const car = await prisma.cars.create({ data: newCar });

    const response = await request
      .delete(`/cars/${car.id}`)
      .set("Authorization", `${usuario.accessToken}`)
      .expect(204)
      .then((response) => response.body);
  });

  test("Error when searching for vehicle by ID - Car not found", async () => {
    const usuario = await createUserLogin();
    const response = await request
      .delete("/cars/2b84a288-be31-44ff-9f88-83a4f41a48aa")
      .set("Authorization", `${usuario.accessToken}`)
      .expect(404)
      .then((response) => response.body);

    expect(response).toStrictEqual({ message: "Car not found." });
  });
});
