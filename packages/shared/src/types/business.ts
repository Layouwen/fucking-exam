export { QuestionType as questionType } from "@prisma/client";

export enum PageOptionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

// questionnaire page
export enum QuestionnaireEditMode {
  TEXT = "TEXT",
  VISUALIZATION = "VISUALIZATION",
}
