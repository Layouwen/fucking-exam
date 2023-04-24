import { Router } from "express";
import questionnaire from "./questionnaire";
import user from "./user";

const admin = Router();

admin.use("/questionnaire", questionnaire);
admin.use("/user", user);

export default admin;
