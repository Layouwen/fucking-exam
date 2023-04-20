import { PrismaClient } from "@prisma/client";
import { CreateQuestionDto } from "@fucking-exam/shared/dist/cjs";

const prisma = new PrismaClient();

class QuestionnaireService {
  async findAll() {
    const data = await prisma.questionnaire.findMany();
    console.log(data, "layouwen");
    return data;
  }

  async create(
    userId: number,
    createQuestionDto: CreateQuestionDto,
    questionnaireId: number
  ) {
    const { id, ...data } = createQuestionDto;
    console.log(questionnaireId, data, "layouwen questionnaireId");
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
