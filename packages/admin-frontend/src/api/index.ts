import { ResponseBaseData } from '@fucking-exam/shared';
import { request } from '@/utils/request';

const Api = {
  Login: '/auth/login',
  GetQuestionnaireList: '/admin/questionnaire',
  DeleteQuestionnaire: '/admin/questionnaire',
  PostQuestionnaire: '/admin/questionnaire',
};

export function loginApi(data: { email: string; password: string }) {
  return request.post<ResponseBaseData<{ token }>>({
    url: Api.Login,
    data,
  });
}

export function getQuestionnaireListApi() {
  return request.get({
    url: Api.GetQuestionnaireList,
  });
}

export function deleteQuestionnaireApi(id: number) {
  return request.delete({
    url: `${Api.DeleteQuestionnaire}/${id}`,
  });
}

export function postQuestionnaireApi(jsonData: any) {
  return request.post({
    url: Api.PostQuestionnaire,
    data: { jsonData },
  });
}
