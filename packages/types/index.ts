export interface User {
  id: number;
  name: number;
  email: number;
  nickname: number;
}

export interface Tag {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
}

export type Question = {
  id?: string;
  answers?: string[];
  answer?: string;
  subject: string;
  options: { label: string; value: string }[];
  analyze: string;
  type: QuestionType;
};

export enum QuestionType {
  SINGLE_CHOICE = "singleChoice",
  MULTIPLE_CHOICE = "multipleChoice",
}

export interface Questionnaire {
  id: number;
  name: string;
  type: 0 | 1;
  status: 0 | 1 | 2 | 3 | 4;
  tags: Tag[];
  user: User;
}

export interface ListResult<D> {
  code: 0;
  result: D;
  total: number;
}

export * from "./business";
