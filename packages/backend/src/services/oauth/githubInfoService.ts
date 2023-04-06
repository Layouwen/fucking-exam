import { PrismaClient } from "@prisma/client";
import { userService } from "../api";

const prisma = new PrismaClient();

class GithubInfoService {
  async create({ jsonData }: { jsonData: any }) {
    const user = await userService.findOneByEmail(jsonData.email);
    return prisma.githubInfo.create({
      data: {
        githubId: String(jsonData.id),
        userId: user!.id,
        jsonData,
      },
    });
  }

  findOneByGithubId(githubId: string) {
    return prisma.githubInfo.findUnique({ where: { githubId } });
  }
}

export default new GithubInfoService();
