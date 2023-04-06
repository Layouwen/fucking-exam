import { Router } from "express";
import { userController } from "../../controllers";

const user = Router();

user.get("/", userController.findAll);
user.get("/:id", userController.findOneById);
user.post("/", userController.createUser);

export default user;
