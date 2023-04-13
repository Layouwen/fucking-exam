import type { QuestionType } from "@prisma/client";
import { User } from "../module";

export interface CreateUserDto extends User {}

export interface RegisterDto extends User {}

export interface CreateQuestionnaireDto {
  jsonData: JsonData;
}

export interface CreateQuestionDto {
  id: string;
  type: QuestionType; // TODO
  subject: string;
  options: any[]; // TODO
  analyze: string; // TODO
  settings: any; // TODO
  answers: string[];
}

export type JsonData = Record<string, any>;
