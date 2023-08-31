import { CreateQuestionnaireTagDto, omitByArray } from '@fucking-exam/shared/dist/cjs'
import { prisma } from '../utils'

const DEFAULT_EXCLUDE = ['']

class QuestionnaireTagService {
  async findAll(where = {}, excludeFields: string[] = DEFAULT_EXCLUDE) {
    const _where = {
      // deletedAt: null,
      ...where,
    }
    let data = await prisma.questionnaireTag.findMany({
      where: _where,
    })

    if (data?.length && excludeFields?.length) {
      data = omitByArray(data, excludeFields)
    }

    return {
      list: data,
      total: await prisma.questionnaireTag.count({ where: _where }),
    }
  }

  async findOne(where: { id?: number }) {
    return prisma.questionnaireTag.findFirst({
      where,
    })
  }

  async create(tag: CreateQuestionnaireTagDto) {
    const res = await prisma.questionnaireTag.create({
      data: tag,
    })

    return res
  }

  update(where: { id: number; userId: number }, data: any) {
    return prisma.questionnaireTag.updateMany({
      where,
      data,
    })
  }
}

export const questionnaireTagService = new QuestionnaireTagService()
