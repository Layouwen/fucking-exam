import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import admin from "./admin";
import auth from "./auth";
import oauth from "./oauth";
import user from "./user";
import questionnaire from "./questionnaire";

const api = Router();

api.use("/admin", authenticate, admin);
api.use("/user", authenticate, user);
api.use("/oauth", oauth);
api.use("/auth", auth);
api.use("/questionnaire", questionnaire);

export default api;
