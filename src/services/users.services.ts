import "reflect-metadata";
import { injectable } from "tsyringe";
import {
  TReturnUser,
  TUserBodyLogin,
  TUserCreateBody,
  TUserReturnToken,
  userReturnSchema,
} from "../schemas/users.schemas";
import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class UsersServices {
  async create(body: TUserCreateBody): Promise<TReturnUser> {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newBody = { ...body, password: passwordHash };

    const response = await prisma.user.create({ data: newBody });

    return userReturnSchema.parse(response);
  }
  async login(body: TUserBodyLogin): Promise<TUserReturnToken> {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(user),
    };
  }
  async get(user: object): Promise<TReturnUser> {
    return userReturnSchema.parse(user);
  }
}
