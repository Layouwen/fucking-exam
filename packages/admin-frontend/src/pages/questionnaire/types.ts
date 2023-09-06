import { Question, QuestionnaireSettings, QuestionModel } from '@fucking-exam/shared';

export type QuestionnaireData = {
  paperName: string;
  questions: (Question | QuestionModel)[];
  settings: QuestionnaireSettings;
  type: 0 | 1;
  tags?: string[];
};
