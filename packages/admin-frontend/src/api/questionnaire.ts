import { vaxios } from '@/utils';
import { QuestionnaireData } from '@/pages/questionnaire/types';

export function getQuestionnaireListApi() {
  return vaxios.get('/admin/questionnaire');
}

export function deleteQuestionnaireApi(id: number) {
  return vaxios.delete(`/admin/questionnaire/${id}`);
}

export function postQuestionnaireApi(jsonData: QuestionnaireData) {
  return vaxios.post('/admin/questionnaire', { jsonData });
}
