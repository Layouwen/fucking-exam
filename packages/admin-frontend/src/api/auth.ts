import { ResponseBaseData } from '@fucking-exam/shared';
import { vaxios } from '@/utils';

export function loginApi(data: { email: string; password: string }) {
  return vaxios.post<ResponseBaseData<{ token }>>('/auth/login', data);
}

export function registerApi(data: { type?: 'email'; email: string; code: string; password: string }) {
  return vaxios.post<ResponseBaseData<{ token }>>('/auth/register', {
    type: 'email',
    ...data,
  });
}

export function emailSendApi(data: { email: string }) {
  return vaxios.post<ResponseBaseData>('/auth/email/send', data);
}
