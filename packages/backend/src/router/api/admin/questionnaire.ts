import { Router } from "express";
import questionnaireController from "../../../controllers/questionnaireController";

const router = Router();

router.get("/", questionnaireController.findAll);
router.post("/", questionnaireController.create);
export default router;
