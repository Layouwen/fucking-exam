import { Request, Response } from "express";
import { CreateUserDto } from "@fucking-exam/shared";
import { userService } from "../services";
import { jwtUtil } from "../utils";

class UserController {
  async findAll(req: Request, res: Response) {
    const userList = await userService.findAll();
    res.json(userList);
  }

  async findOneById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findOneById(Number(id));
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const data = req.body as CreateUserDto;
    try {
      const result = await userService.create(data);
      const { email, id } = result;
      console.log(result, "user result");
      const token = jwtUtil.createToken({ email, id });
      res.json({
        token,
      });
    } catch (e) {
      console.log(e, "err");
      res.json({ msg: "error" });
    }
  }
}

export default new UserController();
