import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { carMock } from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";

describe("Unitary Test: Get Unique a Car", () => {
  const carServices = new CarsServices();

  test("Get a car by ID", async () => {
    
    prismaMock.cars.findFirst.mockResolvedValue(carMock);

    const response = await carServices.getUnique(carMock.id);

    carsExpects(response, carMock);
  });
});
