import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { carMock } from "../mocks/cars.mock";

describe("Unitary Test: Delete a Car", () => {
  test("Deleting a car", async () => {
    const carServices = new CarsServices();

    prismaMock.cars.delete.mockResolvedValue(carMock);
    await carServices.delete(carMock.id);
  });
});
