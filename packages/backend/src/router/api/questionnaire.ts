import { Router } from "express";
import { questionnaireClientController } from "../../controllers";
import { clientAuthenticate } from "../../middlewares";

const questionnaire = Router();

questionnaire.get(
  "/response/:id",
  questionnaireClientController.getQuestionnaireResponseById
);
questionnaire.post(
  "/submit/:id",
  clientAuthenticate,
  questionnaireClientController.submitQuestionnaireById
);
questionnaire.get("/:id", questionnaireClientController.getQuestionnaireById);
questionnaire.get("/", questionnaireClientController.getQuestionnaireList);

export default questionnaire;
