import { Request, Response } from "express";
import { CreateQuestionnaireDto } from "@fucking-exam/shared/dist/cjs";
import { questionnaireService } from "../services";
import { IRequest } from "../types";
import { ResponseError, ResponseSuccess } from "../utils";

class QuestionnaireAdminController {
  async findAll(req: Request, res: Response) {
    const data = await questionnaireService.findAll();
    res.json(new ResponseSuccess({ data }));
  }

  async create(req: IRequest<any, CreateQuestionnaireDto>, res: Response) {
    const user = req.user!;
    const { jsonData } = req.body;
    if (!jsonData)
      return res.json(new ResponseError({ msg: "json data is required" }));

    await questionnaireService.create(user.id, req.body);

    res.json(new ResponseSuccess());
  }

  async delete(req: IRequest<{ id: string }>, res: Response) {
    const {
      user,
      params: { id },
    } = req;

    await questionnaireService.update(
      { id: +id, userId: user!.id },
      { deletedAt: new Date() }
    );

    res.json(new ResponseSuccess());
  }
}

export default new QuestionnaireAdminController();
