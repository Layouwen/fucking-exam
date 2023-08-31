import { QuestionnaireTag } from '../module'

export interface CreateQuestionnaireTagDto extends Omit<QuestionnaireTag, 'id'> {}
