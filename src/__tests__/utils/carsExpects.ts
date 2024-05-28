import { TCars, TCreateBodyCars } from "../../schemas/cars.schemas";

export const carsExpects = (data: TCars, expectations: TCreateBodyCars) => {
  expect(data.id).toBeDefined();
  expect(data.name).toBe(expectations.name);
  expect(data.description).toBe(expectations.description);
  expect(data.brand).toBe(expectations.brand);
  expect(data.year).toBe(expectations.year);
  expect(data.km).toBe(expectations.km);
  expect(data.userId).toBeDefined();
};
