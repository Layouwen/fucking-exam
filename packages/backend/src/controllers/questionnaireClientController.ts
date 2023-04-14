import { Request, Response } from "express";
import { questionnaireService } from "../services";

class QuestionnaireAdminController {
  async getQuestionnaireById(req: Request, res: Response) {
    const params = req.params as { id: string };
    const data = await questionnaireService.findOne(+params.id);
    res.json({
      data,
      msg: "success",
      code: 200,
    });
  }
}

export default new QuestionnaireAdminController();
