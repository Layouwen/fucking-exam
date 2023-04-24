import {
  omit,
  omitByArray,
  UserWhere,
  UserModel,
  CreateUserDto,
} from "@fucking-exam/shared/dist/cjs";
import { CurdIntl } from "../types";
import { prisma } from "../utils";

const DEFAULT_EXCLUDE = ["password", "email"];

class UserService implements CurdIntl {
  async create(data: CreateUserDto) {
    let user = await prisma.user.create({ data });
    if (user) {
      user = omit(user, DEFAULT_EXCLUDE);
    }
    return user;
  }

  update(where: UserWhere, data: Partial<UserModel>) {
    return prisma.user.updateMany({ where, data });
  }

  async findOne(where: UserWhere, excludeField: string[] = DEFAULT_EXCLUDE) {
    let user = await prisma.user.findFirst({ where });

    if (excludeField?.length && user) {
      user = omit(user, excludeField);
    }

    return user;
  }

  async findAll(
    where: UserWhere = {},
    excludeFields: string[] = DEFAULT_EXCLUDE
  ) {
    let users = await prisma.user.findMany({ where });

    if (excludeFields?.length && users?.length) {
      users = omitByArray(users, excludeFields);
    }

    return users;
  }
}

export default new UserService();
