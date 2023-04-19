import { Router } from "express";
import { authController } from "../../../controllers";

const auth = Router();

auth.post("/login", authController.login);
auth.post("/register", authController.register);
auth.post("/email/send", authController.sendEmailCode);

export default auth;
