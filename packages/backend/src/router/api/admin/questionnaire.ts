import { Router } from "express";
import questionnaireController from "../../../controllers/questionnaireController";

const router = Router();

router.get("/", questionnaireController.findAll);
export default router;
