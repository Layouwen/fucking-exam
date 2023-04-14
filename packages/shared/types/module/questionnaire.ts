import { QuestionnaireTag, User } from "./";

export interface Questionnaire {
  id: number;
  name: string;
  type: 0 | 1;
  status: 0 | 1 | 2 | 3 | 4;
  tags: QuestionnaireTag[];
  user: User;
}
