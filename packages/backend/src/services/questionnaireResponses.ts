import {
  CreateQuestionnaireResponseDto,
  omit,
} from "@fucking-exam/shared/dist/cjs";
import { prisma } from "../utils";

const DEFAULT_EXCLUDE = ["user.password"];

class QuestionnaireResponsesService {
  async create(userId: number, data: CreateQuestionnaireResponseDto) {
    return prisma.questionnaireResponses.create({ data: { ...data, userId } });
  }

  async findOne(id: number, excludeFields: string[] = DEFAULT_EXCLUDE) {
    let data = await prisma.questionnaireResponses.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        questionnaire: true,
      },
    });

    if (data && excludeFields?.length) {
      data = omit(data, excludeFields);
    }

    return data;
  }
}

export default new QuestionnaireResponsesService();
