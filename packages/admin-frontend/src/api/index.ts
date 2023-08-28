import { ResponseBaseData } from '@fucking-exam/shared';
import { vaxios } from '../utils';

const Api = {
  Login: '/auth/login',
  Register: '/auth/register',
  GetQuestionnaireList: '/admin/questionnaire',
  DeleteQuestionnaire: '/admin/questionnaire',
  PostQuestionnaire: '/admin/questionnaire',
};

export function loginApi(data: { email: string; password: string }) {
  return vaxios.post<ResponseBaseData<{ token }>>(Api.Login, data);
}

export function registerApi(data: { type: 'email'; email: string; password: string; code: string }) {
  return vaxios.post<ResponseBaseData<{ token }>>(Api.Register, data);
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
