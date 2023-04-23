// export { QuestionType as questionType } from "@prisma/client";
export const questionType = {
  singleChoice: "singleChoice",
  multipleChoice: "multipleChoice",
  fillBlank: "fillBlank",
  judgement: "judgement",
  shortAnswer: "shortAnswer",
  essay: "essay",
  fileUpload: "fileUpload",
};

export enum PageOptionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

// questionnaire page
export enum QuestionnaireEditMode {
  TEXT = "TEXT",
  VISUALIZATION = "VISUALIZATION",
}
