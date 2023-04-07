import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import admin from "./admin";
import auth from "./auth";
import oauth from "./oauth";
import user from "./user";

const api = Router();

api.use("/user", authenticate, user);
api.use("/admin", authenticate, admin);
api.use("/oauth", oauth);
api.use("/auth", auth);

export default api;
