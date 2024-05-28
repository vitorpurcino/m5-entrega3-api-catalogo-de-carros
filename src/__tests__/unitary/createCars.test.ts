import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { carMock, createCarBodyMock, userId } from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";

describe("Unitary Test: Create a Car", () => {
  const carServices = new CarsServices();

  test("Creating a new car in the database", async () => {
    
    prismaMock.cars.create.mockResolvedValue(carMock);
    const response = await carServices.create(createCarBodyMock, userId);

    carsExpects(response, createCarBodyMock);
  });
});
