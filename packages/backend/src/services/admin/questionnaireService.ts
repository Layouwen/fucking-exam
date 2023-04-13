import { PrismaClient } from "@prisma/client";
import { CreateQuestionnaireDto } from "../../dto";
import questionService from "./questionService";

const prisma = new PrismaClient();

class QuestionnaireService {
  async findAll() {
    const data = await prisma.questionnaire.findMany();
    console.log(data, "layouwen");
    return data;
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
      const questionRes = await questionService.create(
        userId,
        question,
        res.id
      );
      console.log(questionRes, "questionRes");
    }
    return res;
  }
}

export default new QuestionnaireService();
