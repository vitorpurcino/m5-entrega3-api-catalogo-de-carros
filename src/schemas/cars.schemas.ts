import z from "zod";

const date = new Date();
const year = Number(date.getFullYear())

export const carsSchemas = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(30),
  description: z.string().min(3).max(255).optional().nullish(),
  brand: z.string().min(1).max(30),
  year: z.number().positive().gte(1769).lte(year),
  km: z.number().nonnegative(),
  userId: z.string().uuid()
});

export const carsCreateBodySchema = carsSchemas.omit({ id: true });
export const carsUpdateBodySchema = carsSchemas.partial().omit({ id: true, userId: true });

export type TCars = z.infer<typeof carsSchemas>;
export type TCreateBodyCars = z.infer<typeof carsCreateBodySchema>;
export type TUpdateBodyCars = z.infer<typeof carsUpdateBodySchema>;
