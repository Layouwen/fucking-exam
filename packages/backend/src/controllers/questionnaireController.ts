import { Request, Response } from "express";
import questionnaireService from "../services/admin/questionnaireService";

class QuestionnaireController {
  async findAll(req: Request, res: Response) {
    const data = await questionnaireService.findAll();
    console.log(data, 'layouwen');
    res.json({
      data: 1
    });
  }
}

export default new QuestionnaireController();
