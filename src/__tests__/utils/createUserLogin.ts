import { prisma } from "../../database/prisma";
import { UsersServices } from "../../services/users.services";
import { userMock } from "../mocks/user.mock";
import bcrypt from "bcrypt";

export async function createUserLogin() {
  const userServices = new UsersServices();

  let usuario = await prisma.user.findFirst({
    where: { email: userMock.email },
  });

  if (!usuario) {
    const passwordHash = await bcrypt.hash(userMock.password, 10);
    const newBody = { ...userMock, password: passwordHash };

    usuario = await prisma.user.create({ data: newBody });
  }

  const login = await userServices.login(usuario);

  return login;
}
