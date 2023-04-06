import { PrismaClient } from "@prisma/client";
import { User } from "../../module";

const prisma = new PrismaClient();

class UserService {
  findAll() {
    return prisma.user.findMany();
  }

  findOneById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  create(data: User) {
    return prisma.user.create({ data });
  }
}

export default new UserService();
