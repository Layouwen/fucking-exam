import {
  CreateQuestionnaireDto,
  omitByArray,
} from "@fucking-exam/shared/dist/cjs";
import { prisma } from "../utils";
import { questionService, questionnaireTagService } from "./";

const DEFAULT_EXCLUDE = ["user.password", "user.email"];

class QuestionnaireService {
  async findAll(where = {}, excludeFields: string[] = DEFAULT_EXCLUDE) {
    const _where = {
      deletedAt: null,
      ...where,
    };
    let data = await prisma.questionnaire.findMany({
      where: _where,
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
        tags: true,
        user: true,
      },
    });

    if (data?.length && excludeFields?.length) {
      data = omitByArray(data, excludeFields);
    }

    return {
      list: data,
      total: await prisma.questionnaire.count({ where: _where }),
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
    const { paperName, questions, settings, tags, type } = jsonData;

    const createQuestionData = {
      paperName,
      settings,
      userId,
      type,
    } as any;

    if (tags?.length) {
      const { list: matchTags } = await questionnaireTagService.findAll({
        name: { in: tags },
      });

      const matchTagIds = matchTags.map((tag) => tag.id);
      const matchTagNames = matchTags.map((tag) => tag.name);
      const createTags = tags.filter(
        (tagName: string) => !matchTagNames.includes(tagName)
      );

      createQuestionData.tags = {
        connect: matchTagIds.map((id: number) => ({ id })),
        create: createTags.map((tagName: string) => ({ name: tagName })),
      };
    }

    const res = await prisma.questionnaire.create({
      data: createQuestionData,
    });

    for (const question of questions) {
      const { id, ..._question } = question;
      await questionService.create(userId, _question, res.id);
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
