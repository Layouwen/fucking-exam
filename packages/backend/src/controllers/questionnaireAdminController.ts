import { Request, Response } from "express";
import { CreateQuestionnaireDto } from "@fucking-exam/shared";
import { questionnaireService } from "../services";

class QuestionnaireAdminController {
  async findAll(req: Request, res: Response) {
    const data = await questionnaireService.findAll();
    res.json({
      data,
    });
  }

  async create(req: Request<any, any, CreateQuestionnaireDto>, res: Response) {
    // @ts-ignore TODO
    const user = req.user;
    const { jsonData } = req.body;
    if (!jsonData)
      return res.json({
        msg: "json data is required",
      });

    await questionnaireService.create(user.id, req.body);
    res.json({
      msg: "success",
    });
  }
}

export default new QuestionnaireAdminController();
