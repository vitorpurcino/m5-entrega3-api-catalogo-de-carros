import {
  bodyInvalidMock,
  carMock,
  createCarBodyMock,
} from "../mocks/cars.mock";
import { request } from "../utils/request";
import { carsExpects } from "../utils/carsExpects";

describe("Integration Test: Create Car", () => {
  test("Registering a new car", async () => {
    const response = await request
      .post("/cars")
      .send(createCarBodyMock)
      .expect(201)
      .then((response) => response.body);

    carsExpects(response, carMock);
  });

  test("Register car with invalid body - Error 400", async () => {
    const response = await request
      .post("/cars")
      .send(bodyInvalidMock)
      .expect(400)
      .then((response) => response.body);

    expect(response.name).toStrictEqual("ZodError");
  });
});
