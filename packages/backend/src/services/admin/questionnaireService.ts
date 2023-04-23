import {
  CreateQuestionnaireDto,
  omitByArray,
} from "@fucking-exam/shared/dist/cjs";
import { prisma } from "../../utils";
import questionService from "./questionService";

const DEFAULT_EXCLUDE = ["user.password", "user.email"];

class QuestionnaireService {
  async findAll(where = {}, excludeFields: string[] = DEFAULT_EXCLUDE) {
    let data = await prisma.questionnaire.findMany({
      where: {
        deletedAt: null,
        ...where,
      },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
        user: true,
      },
    });

    if (data?.length && excludeFields?.length) {
      data = omitByArray(data, excludeFields);
    }

    return {
      list: data,
      total: await prisma.questionnaire.count(),
    };
  }

  async findOne(where: { id?: number; userId?: number }) {
    return prisma.questionnaire.findFirst({
      where,
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async create(userId: number, createQuestionnaireDto: CreateQuestionnaireDto) {
    const { jsonData } = createQuestionnaireDto;
    const { paperName, questions, settings } = jsonData;

    const res = await prisma.questionnaire.create({
      data: {
        paperName,
        settings,
        userId,
      },
    });

    for (const question of questions) {
      await questionService.create(userId, question, res.id);
    }
    return res;
  }

  update(where: { id: number; userId: number }, data: any) {
    return prisma.questionnaire.updateMany({
      where,
      data,
    });
  }
}

export default new QuestionnaireService();
