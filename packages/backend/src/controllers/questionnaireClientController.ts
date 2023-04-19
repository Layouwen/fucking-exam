import { Response } from "express";
import {
  questionnaireResponsesService,
  questionnaireService,
} from "../services";
import { IRequest } from "../types";
import { CreateQuestionnaireResponseDto } from "@fucking-exam/shared";

class QuestionnaireClientController {
  async getQuestionnaireList(req: IRequest, res: Response) {
    const data = await questionnaireService.findAll();

    res.json({
      data,
      msg: "success",
      code: 200,
    });
  }

  async getQuestionnaireById(req: IRequest<{ id: string }>, res: Response) {
    const { params } = req;

    const data = await questionnaireService.findOne(+params.id);

    res.json({
      data,
      msg: "success",
      code: 200,
    });
  }

  async submitQuestionnaireById(
    req: IRequest<{ id: string }, CreateQuestionnaireResponseDto>,
    res: Response
  ) {
    const { user, params, body } = req;

    const data = await questionnaireResponsesService.create(+user.id, {
      ...body,
      questionnaireId: +params.id,
    });

    res.json({
      data: {
        id: data.id,
      },
      msg: "success",
      code: 200,
    });
  }

  async getQuestionnaireResponseById(
    req: IRequest<{ id: string }>,
    res: Response
  ) {
    const { id } = req.params;

    const data = await questionnaireResponsesService.findOne(+id);

    res.json({
      data,
      msg: "success",
      code: 200,
    });
  }
}

export default new QuestionnaireClientController();
