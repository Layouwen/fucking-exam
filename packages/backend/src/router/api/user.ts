import { Router } from "express";

const user = Router();

user.get("/", (req, res) => {
  res.send("get user");
});

user.post("/", (req, res) => {
  res.send("post user");
});

export default user;
