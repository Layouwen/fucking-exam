import { QUESTION_TYPE } from "../constants";

export type QuestionType = keyof typeof QUESTION_TYPE;

export enum PageOptionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

// questionnaire page
export enum QuestionnaireEditMode {
  TEXT = "TEXT",
  VISUALIZATION = "VISUALIZATION",
}
