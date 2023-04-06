import { Router } from "express";
import axios from "axios";
import config from "../../config";
import { userService } from "../../services";
import githubInfoService from "../../services/oauth/githubInfoService";
import { jwtUtil } from "../../utils";

// https://github.com/login/oauth/authorize?client_id=a644d75524601839ea7a&redirect_uri=http://localhost:3000/oauth/github
// https://github.com/login/oauth/authorize?client_id=a644d75524601839ea7a&redirect_uri=http://localhost:3000/oauth/github&scope=user&response_type=token
// http://localhost:3001/oauth/github

const github = Router();

github.get("/", async (req, res) => {
  const code = req.query.code;
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
  let accessToken = tokenResponse.data.access_token;
  console.log(accessToken);
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

  const githubInfo = await githubInfoService.findOneByGithubId(String(result.data.id));

  if (!githubInfo) {
    await githubInfoService.create({ jsonData: result.data });
  }

  //   {
  //   login: 'Layouwen',
  //   id: 60692794,
  //   node_id: 'MDQ6VXNlcjYwNjkyNzk0',
  //   avatar_url: 'https://avatars.githubusercontent.com/u/60692794?v=4',
  //   gravatar_id: '',
  //   url: 'https://api.github.com/users/Layouwen',
  //   html_url: 'https://github.com/Layouwen',
  //   followers_url: 'https://api.github.com/users/Layouwen/followers',
  //   following_url: 'https://api.github.com/users/Layouwen/following{/other_user}',
  //   gists_url: 'https://api.github.com/users/Layouwen/gists{/gist_id}',
  //   starred_url: 'https://api.github.com/users/Layouwen/starred{/owner}{/repo}',
  //   subscriptions_url: 'https://api.github.com/users/Layouwen/subscriptions',
  //   organizations_url: 'https://api.github.com/users/Layouwen/orgs',
  //   repos_url: 'https://api.github.com/users/Layouwen/repos',
  //   events_url: 'https://api.github.com/users/Layouwen/events{/privacy}',
  //   received_events_url: 'https://api.github.com/users/Layouwen/received_events',
  //   type: 'User',
  //   site_admin: false,
  //   name: 'Avan',
  //   company: null,
  //   blog: 'easyhappy.top',
  //   location: 'GuangZhou China',
  //   email: 'layouwen@gmail.com',
  //   hireable: null,
  //   bio: 'Keep Learning...',
  //   twitter_username: null,
  //   public_repos: 64,
  //   public_gists: 0,
  //   followers: 10,
  //   following: 36,
  //   created_at: '2020-02-05T10:00:40Z',
  //   updated_at: '2023-04-02T07:11:18Z',
  //   private_gists: 0,
  //   total_private_repos: 4,
  //   owned_private_repos: 4,
  //   disk_usage: 66956,
  //   collaborators: 0,
  //   two_factor_authentication: false,
  //   plan: {
  //     name: 'free',
  //     space: 976562499,
  //     collaborators: 0,
  //     private_repos: 10000
  //   }
  // }

  const token = jwtUtil.createToken({ email, id: user.id });

  res.json({
    token,
  });
});

export default github;
