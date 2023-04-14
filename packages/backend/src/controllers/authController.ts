import { Request, Response } from "express";
import { RegisterDto } from "@fucking-exam/shared";
import { userService } from "../services";
import { jwtUtil } from "../utils";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.findOneByEmail(email);
    if (!user) {
      res.json({
        msg: "User not found",
      });
      return;
    }
    if (user.password !== password) {
      res.json({
        msg: "Password is not correct",
      });
      return;
    }
    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });
    res.json({
      token,
    });
  }

  async register(req: Request, res: Response) {
    const { email, password, nickname, username, sex } =
      req.body as RegisterDto;

    const hasUser = await userService.findOneByEmail(email);

    if (hasUser) {
      res.json({
        msg: "User already exists",
      });
      return;
    }

    const user = await userService.create({
      email,
      password,
      nickname,
      username,
      sex,
    });

    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });
    res.json({
      token,
    });
  }
}

export default new AuthController();
