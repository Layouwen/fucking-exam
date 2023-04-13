import { Router } from "express";
import axios from "axios";
import config from "../../../config";
import { userService } from "../../../services";
import githubInfoService from "../../../services/oauth/githubInfoService";
import { jwtUtil } from "../../../utils";

const github = Router();

github.post("/", async (req, res) => {
  const code = req.body.code;
  if (!code) {
    res.send({
      msg: "code require",
    });
    return;
  }

  try {
    const tokenResponse = await axios({
      method: "post",
      url:
        "https://github.com/login/oauth/access_token?" +
        `client_id=${config.oauth.github.clientID}&` +
        `client_secret=${config.oauth.github.clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: "application/json",
      },
    });

    if (tokenResponse.data.error) {
      res.send({
        msg: tokenResponse.data.error_description,
      });
      return;
    }

    let accessToken = tokenResponse.data.access_token;

    const result = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });

    // TODO: any
    const { email, name } = result.data as any;
    let user = await userService.findOneByEmail(email);
    if (!user) {
      user = await userService.create({
        email,
        nickname: name,
      });
    }

    const githubInfo = await githubInfoService.findOneByGithubId(
      String(result.data.id)
    );

    if (!githubInfo) {
      await githubInfoService.create({ jsonData: result.data });
    }

    const token = jwtUtil.createToken({ email, id: user.id });

    res.json({
      token,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail",
    });
  }
});

export default github;
