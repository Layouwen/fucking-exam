import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import user from "./user";

const api = Router();

api.use("/user", authenticate, user);

export default api;
