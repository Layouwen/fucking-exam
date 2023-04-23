import { request } from '@/utils/request';

const Api = {
  Login: '/auth/login',
  GetQuestionnaireList: '/admin/questionnaire',
  DeleteQuestionnaire: '/admin/questionnaire',
};

export function loginApi(data: { email: string; password: string }) {
  return request.post({
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
