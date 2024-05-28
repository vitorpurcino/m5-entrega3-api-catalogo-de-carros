import { prisma } from "../../database/prisma";
import { listBodyCarsMock, userId } from "../mocks/cars.mock";
import { createUserLogin } from "../utils/createUserLogin";
import { request } from "../utils/request";

describe("Integration Test: Get Many Cars", () => {
  test("Request multiple cars from database", async () => {
    const usuario = await createUserLogin();
    const newListbodyCar = listBodyCarsMock.map((element) => {
      return {...element, userId: usuario.user.id}
    });
    
    await prisma.cars.createMany({ data: newListbodyCar });

    const response = await request
      .get("/cars")
      .expect(200)
      .then((response) => response.body);

    expect(response).toHaveLength(listBodyCarsMock.length);
  });
});
