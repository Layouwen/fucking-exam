// import {Question} from '@prisma/client'
import { QUESTION_TYPE } from "../../constants";
import { DbFiled } from "../utils";

export type QuestionType = keyof typeof QUESTION_TYPE;

export type QuestionRandomType = "0" | "1";

export type QuestionSettings = {
  randomType: QuestionRandomType;
};

export type QuestionOption = {
  label: string;
  value: string;
};

export interface Question {
  subject: string;
  order: number;
  type: QuestionType;
  settings: QuestionSettings;
  options: QuestionOption[];
  answers: string[];
  analyze: string | null;
  questionnaireId: number;
  userId: number;
}

export interface QuestionModel extends DbFiled, Question {}
