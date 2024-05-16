import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { carUpdateBodyMock, newCarMock } from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";

describe("Unitary Test: Update a Car", () => {
  
  test("Updating a car", async () => {
    const carServices = new CarsServices();
    
    prismaMock.cars.update.mockResolvedValue(newCarMock);    
    
    const response = await carServices.update(carUpdateBodyMock, newCarMock.id);

    carsExpects(response, newCarMock)
  });
});
