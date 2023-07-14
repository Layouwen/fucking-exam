import { ResponseBaseData } from '@fucking-exam/shared';
import { vaxios } from '../utils';

const Api = {
  Login: '/auth/login',
  GetQuestionnaireList: '/admin/questionnaire',
  DeleteQuestionnaire: '/admin/questionnaire',
  PostQuestionnaire: '/admin/questionnaire',
};

export function loginApi(data: { email: string; password: string }) {
  return vaxios.post<ResponseBaseData<{ token }>>(Api.Login, data);
}

export function getQuestionnaireListApi() {
  return vaxios.get(Api.GetQuestionnaireList);
}

export function deleteQuestionnaireApi(id: number) {
  return vaxios.delete(`${Api.DeleteQuestionnaire}/${id}`);
}

export function postQuestionnaireApi(jsonData: any) {
  return vaxios.post(Api.PostQuestionnaire, { jsonData });
}
