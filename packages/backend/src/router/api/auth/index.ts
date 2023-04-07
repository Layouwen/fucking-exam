import { Router } from "express";
import { authController } from "../../../controllers";

const auth = Router();

auth.post("/login", authController.login);
auth.post("/register", authController.register);

export default auth;
