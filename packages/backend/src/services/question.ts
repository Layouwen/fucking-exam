import { CreateQuestionDto } from "@fucking-exam/shared/dist/cjs";
import { prisma } from "../utils";

class QuestionnaireService {
  async findAll() {
    const data = await prisma.questionnaire.findMany();

    return data;
  }

  async create(
    userId: number,
    createQuestionDto: CreateQuestionDto,
    questionnaireId: number
  ) {
    const res = await prisma.question.create({
      data: {
        ...createQuestionDto,
        questionnaireId,
        userId,
      },
    });
    return res;
  }
}

export default new QuestionnaireService();
