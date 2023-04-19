import { Question } from "../data";
import { User } from "../module";

export interface CreateUserDto extends User {}

export interface RegisterDto extends User {
  code: string;
  type: "email" | "phone" | "username";
  phone?: string;
}

export interface CreateQuestionnaireDto {
  jsonData: JsonData;
}

export interface CreateQuestionDto extends Question {}

export type JsonData = Record<string, any>;

export * from "./questionnaireResponses";
