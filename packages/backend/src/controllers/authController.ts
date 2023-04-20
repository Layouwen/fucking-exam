import { Request, Response } from "express";
import { RegisterDto } from "@fucking-exam/shared/dist/cjs";
import config from "../config";
import { userService } from "../services";
import { IRequest } from "../types";
import { jwtUtil } from "../utils";
// @ts-ignore
import nodemailer from "nodemailer";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.findOneByEmail(email, []);
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

  async register(req: IRequest<any, RegisterDto>, res: Response) {
    const { email, password, phone, username, code, type } = req.body;

    if (!password) return res.json({ msg: "请输入密码" });

    if (type === "email") {
      if (!req.session[email]) return res.json({ msg: "请先获取验证码" });
      if (!email || !code) return res.json({ msg: "请输入完整参数" });
      if (code !== req.session[email]) {
        return res.json({ msg: "验证码错误" });
      }
      const hasUser = await userService.findOneByEmail(email);
      if (hasUser) {
        delete req.session[email];
        return res.json({ msg: "用户已存在" });
      }
    } else if (type === "username") {
      if (!username) return res.json({ msg: "请输入完整参数" });
    } else if (type === "phone") {
      if (!phone || !code) return res.json({ msg: "请输入完整参数" });
    } else {
      return res.json({ msg: "请输入完整参数" });
    }

    const user = await userService.create({
      email,
      password,
    });

    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });
    res.json({
      token,
    });
  }

  async sendEmailCode(req: IRequest<any, { email: string }>, res: Response) {
    const { email } = req.body;
    if (!email) return res.json({ msg: "请输入邮箱" });
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
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

  <head></head>

  <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
      <tr style="width:100%">
        <td><img alt="Plaid" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
          <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">核实你的身份</p>
          <h1 style="color:#000;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">输入代码以完成注册</h1>
          <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
            <tbody>
              <tr>
                <td>
                  <p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${code}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">不知道为什么会收到验证码?</p>
          <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">如果你没有请求该验证码，请联系 <a target="_blank" style="color:#444;text-decoration:underline" href="mailto:layouwen@gmail.com">layouwen@gmail.com</a>.</p>
        </td>
      </tr>
    </table>
    <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">由 WhaleWave 安全提供</p>
  </body>

</html>`,
      });
      res.json({
        msg: "成功",
      });
    } catch (e) {
      console.log(e, "e");
      res.json({ msg: "失败" });
    }
  }
}

export default new AuthController();
