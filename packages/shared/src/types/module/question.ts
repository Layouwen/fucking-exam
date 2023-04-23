import { QuestionType } from "../business";
import { JsonData } from "../dto";

export type QuestionModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  subject: string;
  order: number;
  type: QuestionType;
  settings: JsonData;
  options: JsonData;
  answers: JsonData;
  analyze: string | null;
  questionnaireId: number;
  userId: number;
};
