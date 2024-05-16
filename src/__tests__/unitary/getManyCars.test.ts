import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { carMock, listCarsMock } from "../mocks/cars.mock";
import { carsExpects } from "../utils/carsExpects";

describe("Unitary Test: Get Many Cars", () => {
  const carServices = new CarsServices();

  test("Get many cars", async () => {
    prismaMock.cars.findMany.mockResolvedValue(listCarsMock);

    const response = await carServices.getMany();

    expect(response).toHaveLength(2);
  });
});
