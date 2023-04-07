import { Router } from "express";
import github from "./github";

const oauth = Router();

oauth.use("/github", github);

export default oauth;
