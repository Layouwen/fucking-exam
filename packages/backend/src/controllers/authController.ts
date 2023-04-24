import {
  AuthRegisterRequestBody,
  AuthLoginRequestBody,
  AuthSendEmailRequestBody,
} from "@fucking-exam/shared/dist/cjs";
import { Response } from "express";
import fs from "fs";
import path from "path";
import config from "../config";
import { userService } from "../services";
import { IRequest } from "../types";
import { jwtUtil, ResponseError, ResponseSuccess } from "../utils";
import nodemailer from "nodemailer";

class AuthController {
  async login(req: IRequest<any, AuthLoginRequestBody>, res: Response) {
    const { email, password } = req.body;

    const user = await userService.findOne({ email }, []);

    if (!user) {
      return res.json(new ResponseError({ msg: "User not found" }));
    }

    if (user.password !== password) {
      return res.json(new ResponseError({ msg: "Password is not correct" }));
    }

    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });

    // remove password
    const { password: _password, email: _email, ..._user } = user;

    res.json(new ResponseSuccess({ data: { token, user: _user } }));
  }

  async register(req: IRequest<any, AuthRegisterRequestBody>, res: Response) {
    const { email, password, phone, username, code, type } = req.body;

    if (!password) return res.json(new ResponseError({ msg: "请输入密码" }));
    if (!email) return res.json(new ResponseError({ msg: "请输入邮箱" }));

    if (type === "email") {
      if (!req.session[email])
        return res.json(new ResponseError({ msg: "请先获取验证码" }));

      if (!email || !code)
        return res.json(new ResponseError({ msg: "请输入完整参数" }));

      if (code !== req.session[email]) {
        return res.json(new ResponseError({ msg: "验证码错误" }));
      }

      const hasUser = await userService.findOne({ email });

      if (hasUser) {
        delete req.session[email];
        return res.json(new ResponseError({ msg: "用户已存在" }));
      }
    } else if (type === "username") {
      if (!username)
        return res.json(new ResponseError({ msg: "请输入完整参数" }));
    } else if (type === "phone") {
      if (!phone || !code)
        return res.json(new ResponseError({ msg: "请输入完整参数" }));
    } else {
      return res.json(new ResponseError({ msg: "请输入完整参数" }));
    }

    const user = await userService.create({
      email,
      password,
    });

    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });

    delete req.session[email];

    res.json(
      new ResponseSuccess({
        data: {
          token,
          user,
        },
      })
    );
  }

  async sendEmailCode(
    req: IRequest<any, AuthSendEmailRequestBody>,
    res: Response
  ) {
    const { email } = req.body;

    if (!email) return res.json(new ResponseError({ msg: "请输入邮箱" }));

    const user = await userService.findOne({ email });

    if (user) return res.json(new ResponseError({ msg: "邮箱已存在" }));

    const code = Math.random().toString().slice(2, 8);
    req.session[email] = code;

    const transporter = nodemailer.createTransport({
      host: "smtp.126.com",
      secure: true,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    try {
      await transporter.sendMail({
        from: config.email.user,
        to: email,
        subject: "Fucking Exam Code",
        html: fs
          .readFileSync(path.resolve(__dirname, "../email.html"))
          .toString()
          .replace("${code}", code),
      });
      res.json(new ResponseSuccess({ msg: "发送成功" }));
    } catch (e) {
      console.log(e, "e");
      res.json(new ResponseError({ msg: "发送失败" }));
    }
  }
}

export default new AuthController();
