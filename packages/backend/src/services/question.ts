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
    const { id, type, ..._createQuestionDto } = createQuestionDto;

    const res = await prisma.question.create({
      data: {
        ..._createQuestionDto,
        questionnaireId,
        type: type as any,
        userId,
      },
    });
    return res;
  }
}

export default new QuestionnaireService();
