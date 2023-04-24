import { DbFiled } from "../utils";

export interface User {
  email: string;
  username: string | null;
  nickname: string | null;
  password: string | null;
  sex: number;
}

export interface UserModel extends User, DbFiled {}

export interface UserWhere extends Partial<UserModel> {}
