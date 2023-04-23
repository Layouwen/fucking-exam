import { Router } from "express";
import { questionnaireAdminController } from "../../../controllers";

const router = Router();

router.get("/", questionnaireAdminController.findAll);
router.post("/", questionnaireAdminController.create);
router.delete("/:id", questionnaireAdminController.delete);

export default router;
