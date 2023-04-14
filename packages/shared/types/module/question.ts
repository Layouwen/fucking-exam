import { QuestionType } from "../business";

export interface Question {
  id?: string;
  answers?: string[];
  answer?: string;
  subject: string;
  options: { label: string; value: string }[];
  analyze: string;
  type: QuestionType;
  settings: {
    randomType: "0" | "1" | "2"; // 0 不随机 1 选项随机 2 TODO
  };
}
