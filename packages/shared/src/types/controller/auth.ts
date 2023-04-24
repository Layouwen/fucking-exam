import { UserModel } from "../module";

// auth register
export interface AuthRegisterRequestBody {
  email?: string;
  phone?: string;
  username?: string;
  password: string;
  code: string;
  type: "email" | "phone" | "username";
}

export interface AuthRegisterResponseData extends AuthLoginResponseData {}

// auth login
export interface AuthLoginRequestBody {
  email: string;
  password: string;
}

export interface AuthLoginResponseData {
  token: string;
  user: Pick<UserModel, "id" | "nickname" | "username" | "sex">;
}

// auth send email
export interface AuthSendEmailRequestBody {
  email: string;
}

// oauth GitHub login
export interface OauthGithubRequestBody {
  code: string;
}

export interface OAuthGithubResponseData {
  token: string;
}
