import { OauthGithubRequestBody } from "@fucking-exam/shared/dist/cjs";
import { Router } from "express";
import axios from "axios";
import config from "../../../config";
import { userService, githubInfoService } from "../../../services";
import { IRequest } from "../../../types";
import { jwtUtil, ResponseError, ResponseSuccess } from "../../../utils";

const github = Router();

github.post("/", async (req: IRequest<any, OauthGithubRequestBody>, res) => {
  const { code } = req.body;

  if (!code) return res.send(new ResponseError({ msg: "code require" }));

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
      return res.send(
        new ResponseError({ msg: tokenResponse.data.error_description })
      );
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

    const { email, name } = result.data as { email: string; name: string };

    let user = await userService.findOne({ email });

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

    const token = jwtUtil.createToken({
      email,
      id: user.id,
    });

    res.json(new ResponseSuccess({ data: { token } }));
  } catch (e) {
    console.log(e);
    res.json(new ResponseError());
  }
});

export default github;
