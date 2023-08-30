import { vaxios } from '@/utils';

export function getQuestionnaireListApi() {
  return vaxios.get('/admin/questionnaire');
}

export function deleteQuestionnaireApi(id: number) {
  return vaxios.delete(`/admin/questionnaire/${id}`);
}

export function postQuestionnaireApi(jsonData: any) {
  return vaxios.post('/admin/questionnaire', { jsonData });
}
