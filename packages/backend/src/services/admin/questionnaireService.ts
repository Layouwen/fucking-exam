import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class QuestionnaireService {
  async findAll() {
    const data = await prisma.questionnaire.findMany();
    console.log(data, "layouwen");
    return data
  }
}

export default new QuestionnaireService();
