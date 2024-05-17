import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255).toLowerCase(),
  email: z.string().email().min(3).max(255).toLowerCase(),
  password: z.string().min(6).max(8),
});

export const userCreateBodySchema = userSchema.omit({ id: true });

export type TUser = z.infer<typeof userSchema>;
export type TUserCreateBody = z.infer<typeof userCreateBodySchema>;
