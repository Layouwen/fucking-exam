import { Response } from 'express'
import { questionnaireResponsesService, questionnaireService } from '../services'
import { IRequest } from '../types'
import {
  QuestionnaireClientSubmitRequestParams,
  QuestionClientQuestionnaireResponseParams,
  QuestionnaireClientSubmitRequestBody,
  CreateQuestionnaireResponseDto,
} from '@fucking-exam/shared/dist/cjs'
import { ResponseSuccess } from '../utils'

class QuestionnaireClientController {
  async getQuestionnaireList(req: IRequest, res: Response) {
    const data = await questionnaireService.findAll()

    res.json(new ResponseSuccess({ data }))
  }

  async getQuestionnaireById(req: IRequest<{ id: string }>, res: Response) {
    const {
      params: { id },
    } = req

    const data = await questionnaireService.findOne({ id: +id })

    res.json(new ResponseSuccess({ data }))
  }

  async submitQuestionnaireById(
    req: IRequest<QuestionnaireClientSubmitRequestParams, QuestionnaireClientSubmitRequestBody>,
    res: Response
  ) {
    const {
      user,
      params,
      body: { fingerprint, ...body },
    } = req

    const createDto = {
      ...body,
      questionnaireId: +params.id,
    } as CreateQuestionnaireResponseDto

    if (user) {
      createDto.userId = +user.id
    }
    if (fingerprint) {
      createDto.fingerprint = fingerprint
    }

    const data = await questionnaireResponsesService.create(createDto)

    res.json(new ResponseSuccess({ data: { id: data.id } }))
  }

  async getQuestionnaireResponseById(req: IRequest<QuestionClientQuestionnaireResponseParams>, res: Response) {
    const { id } = req.params

    const data = await questionnaireResponsesService.findOne(+id)

    res.json(new ResponseSuccess({ data }))
  }
}

export default new QuestionnaireClientController()
