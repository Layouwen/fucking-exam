import { request } from '@/utils/request';

const Api = {
  Login: '/auth/login',
};

export function loginApi(data: { email: string; password: string }) {
  return request.post({
    url: Api.Login,
    data,
  });
}
