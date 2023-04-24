import { DbFiled } from "../utils";
import { Question, QuestionModel, QuestionRandomType } from "./question";

export type QuestionnaireSettings = {
  isDisplayOrder: boolean;
  randomType: QuestionRandomType;
};

export interface Questionnaire {
  deletedAt: Date | null;
  paperName: string;
  settings: QuestionnaireSettings;
  questions: Question[];
  status: number | null;
  type: number | null;
  version: number;
  userId: number;
}

export interface QuestionnaireModel extends Questionnaire, DbFiled {
  questions: QuestionModel[];
}

export interface QuestionnaireWhere extends Partial<QuestionnaireModel> {}
