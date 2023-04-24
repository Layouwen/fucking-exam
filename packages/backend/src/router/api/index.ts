import { Router } from "express";
import { clientAuthenticate } from "../../middlewares";
import admin from "./admin";
import auth from "./auth";
import oauth from "./oauth";
import questionnaire from "./questionnaire";

const api = Router();

api.use("/admin", clientAuthenticate, admin);
api.use("/oauth", oauth);
api.use("/auth", auth);
api.use("/questionnaire", questionnaire);

export default api;
