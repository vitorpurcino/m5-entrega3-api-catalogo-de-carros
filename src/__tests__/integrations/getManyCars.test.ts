import { prisma } from "../../database/prisma";
import { listBodyCarsMock } from "../mocks/cars.mock";
import { request } from "../utils/request";

describe("Integration Test: Get Many Cars", () => {
  test("Request multiple cars from database", async () => {
    await prisma.cars.createMany({ data: listBodyCarsMock });

    const response = await request
      .get("/cars")
      .expect(200)
      .then((response) => response.body);

    expect(response).toHaveLength(listBodyCarsMock.length);
  });
});
