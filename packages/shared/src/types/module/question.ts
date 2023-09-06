// import {Question} from '@prisma/client'
import { questionType } from "../../constants";
import { DbFiled } from "../utils";

export type QuestionType = (typeof questionType)[keyof typeof questionType];

export type QuestionRandomType = "0" | "1";

export type QuestionSettings = {
  randomType: QuestionRandomType;
};

export type QuestionOption = {
  label: string;
  value: string;
};

export interface Question {
  id?: string;
  subject: string;
  order: number;
  type: QuestionType;
  settings: QuestionSettings;
  options: QuestionOption[];
  answers: string[];
  analyze: string | null;
  questionnaireId?: number;
  userId?: number;
  richText?: string;
}

export interface QuestionModel extends DbFiled, Omit<Question, "id"> {}
