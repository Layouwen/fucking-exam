import { User } from "@fucking-exam/shared";
import { omit, omitByArray } from "@fucking-exam/shared";
import { prisma } from "../../utils";

const DEFAULT_EXCLUDE = ["password"];

class UserService {
  async findAll(excludeFields: string[] = DEFAULT_EXCLUDE) {
    let users = await prisma.user.findMany();

    if (excludeFields?.length && users?.length) {
      users = omitByArray(users, excludeFields);
    }

    return users;
  }

  async findOneById(id: number, excludeField: string[] = DEFAULT_EXCLUDE) {
    let user = await prisma.user.findUnique({ where: { id } });

    if (excludeField?.length && user) {
      user = omit(user, excludeField);
    }

    return user;
  }

  async findOneByEmail(
    email: string,
    excludeFields: string[] = DEFAULT_EXCLUDE
  ) {
    let user = await prisma.user.findUnique({ where: { email } });

    if (excludeFields?.length && user) {
      user = omit(user, excludeFields);
    }

    return user;
  }

  create(data: User) {
    return prisma.user.create({ data });
  }
}

export default new UserService();
