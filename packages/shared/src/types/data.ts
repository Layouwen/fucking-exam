import { QuestionModel, QuestionnaireModel } from "./module";
import { OmitDBFiled } from "./utils";

export type QuestionRandomType = "0" | "1";

export type QuestionOption = {
  label: string;
  value: string;
};

export type QuestionnaireSettings = {
  isDisplayOrder: boolean;
  randomType: QuestionRandomType;
};

export type QuestionSettings = {
  randomType: QuestionRandomType;
};

export type QuestionQuestion = {
  id: number;
  subject: string;
  type: string;
  settings: QuestionSettings;
  options: QuestionOption[];
  answers: string[];
  analyze: string;
  questionnaireId: number;
  userId: number;
};

export interface Questionnaire
  extends OmitDBFiled<QuestionnaireModel, "settings"> {
  settings: QuestionnaireSettings;
  questions: QuestionQuestion[];
}

export interface Question
  extends OmitDBFiled<QuestionModel, "userId" | "questionnaireId"> {
  id: string | number;
  type: any;
  options: QuestionOption[];
  settings: QuestionSettings;
  answers: string[];
}
