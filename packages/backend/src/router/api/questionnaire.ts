import { Router } from "express";
import { questionnaireClientController } from "../../controllers";

const questionnaire = Router();

questionnaire.get("/:id", questionnaireClientController.getQuestionnaireById);

export default questionnaire;
