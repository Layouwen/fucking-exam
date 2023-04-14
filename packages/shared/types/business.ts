export { QuestionType } from "@prisma/client";

export enum PageOptionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

// questionnaire page
export enum QuestionnaireEditMode {
  TEXT = "TEXT",
  VISUALIZATION = "VISUALIZATION",
}

export interface QuestionnaireSettings {
  isDisplayOrder: boolean;
  randomType: "0" | "1";
}
