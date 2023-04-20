import { QuestionQuestion } from "../data";

export interface CreateQuestionnaireResponseDto {
  questionnaireId: number;
  order: string[];
  answers: Record<string, string[]>;
  questionnaireVersion: number;
  questions: QuestionQuestion[];
}
