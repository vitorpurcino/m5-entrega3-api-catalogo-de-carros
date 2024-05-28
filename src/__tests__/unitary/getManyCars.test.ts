import { prismaMock } from "../mocks/prisma";
import { CarsServices } from "../../services/cars.services";
import { listCarsMock } from "../mocks/cars.mock";

describe("Unitary Test: Get Many Cars", () => {
  const carServices = new CarsServices();

  test("Get many cars", async () => {
    prismaMock.cars.findMany.mockResolvedValue(listCarsMock);

    const response = await carServices.getMany();

    expect(response).toHaveLength(2);
  });
});
