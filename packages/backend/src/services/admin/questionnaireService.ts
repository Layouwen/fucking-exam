import { CreateQuestionnaireDto } from "@fucking-exam/shared";
import { prisma } from "../../utils";
import questionService from "./questionService";
import { omitByArray } from "@fucking-exam/shared";

const DEFAULT_EXCLUDE = ["user.password"];

class QuestionnaireService {
  async findAll(excludeFields: string[] = DEFAULT_EXCLUDE) {
    let data = await prisma.questionnaire.findMany({
      include: {
        questions: {
          orderBy: {
            createdAt: "asc",
          },
        },
        user: true,
      },
    });

    if (data?.length && excludeFields?.length) {
      data = omitByArray(data, excludeFields);
    }

    return data;
  }

  async findOne(id: number) {
    return prisma.questionnaire.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            createdAt: "asc",
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
}

export default new QuestionnaireService();
