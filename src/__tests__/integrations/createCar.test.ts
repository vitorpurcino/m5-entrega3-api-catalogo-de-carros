import {
  bodyInvalidMock,
  carMock,
  createCarBodyMock,
} from "../mocks/cars.mock";
import { request } from "../utils/request";
import { carsExpects } from "../utils/carsExpects";
import { createUserLogin } from "../utils/createUserLogin";

describe("Integration Test: Create Car", () => {
  test("Registering a new car", async () => {
    const usuario = await createUserLogin();

    const response = await request
      .post("/cars")
      .set("Authorization", `${usuario.accessToken}`)
      .send(createCarBodyMock)
      .expect(201)
      .then((response) => response.body);

    carsExpects(response, carMock);
  });

  test("Register car with invalid body - Error 400", async () => {
    const usuario = await createUserLogin();
    const response = await request
      .post("/cars")
      .set("Authorization", `${usuario.accessToken}`)
      .send(bodyInvalidMock)
      .expect(400)
      .then((response) => response.body);

    expect(response.name).toStrictEqual("ZodError");
  });
});
