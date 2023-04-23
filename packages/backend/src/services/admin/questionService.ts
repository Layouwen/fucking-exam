import { PrismaClient } from "@prisma/client";
import { CreateQuestionDto } from "@fucking-exam/shared/dist/cjs";

const prisma = new PrismaClient();

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
    const { id, ...data } = createQuestionDto;

    const res = await prisma.question.create({
      data: {
        ...data,
        questionnaireId,
        userId,
      },
    });
    return res;
  }
}

export default new QuestionnaireService();
