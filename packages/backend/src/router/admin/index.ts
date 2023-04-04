import { Router } from "express";
import questionnaire from "./questionnaire";

const admin = Router();

admin.use("/questionnaire", questionnaire);

export default admin;
