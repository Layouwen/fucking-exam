import {
  OAuthResponse,
  QuestionnaireResponseData,
  QuestionnaireResponseResponseData,
  QuestionnaireSubmitResponseData,
  QuestionQuestion,
  ResponseBaseData,
} from "@fucking-exam/shared";

import { request } from "~/utils";

export function loginApi(data: any) {
  return request("/api/auth/login", {
    method: "POST",
    body: { type: "email", ...data },
  });
}

export function githubLoginApi(code: string) {
  return request<ResponseBaseData<OAuthResponse>>("/api/oauth/github", {
    method: "POST",
    body: { code },
  });
}

export function registerApi(data: any) {
  return request("/api/auth/register", {
    method: "POST",
    body: {
      type: "email",
      ...data,
    },
  });
}

export function sendEmailCodeApi(email: string) {
  return request("/api/auth/email/send", {
    method: "POST",
    body: { email },
  });
}

export function getQuestionnaireListApi() {
  return request<ResponseBaseData<any>>(`/api/questionnaire`);
}

export function getQuestionnaireApi(id: string) {
  return request<ResponseBaseData<QuestionnaireResponseData>>(
    `/api/questionnaire/${id}`
  );
}

export function postQuestionnaireSubmitApi(
  questionnaireId: number,
  data: {
    order: number[];
    answers: Record<string, string[]>;
    questionnaireVersion: number;
    questions: QuestionQuestion[];
  }
) {
  return request<ResponseBaseData<QuestionnaireSubmitResponseData>>(
    `/api/questionnaire/submit/${questionnaireId}`,
    {
      method: "POST",
      body: data,
    }
  );
}

export function getQuestionnaireResponseApi(id: string) {
  return request<ResponseBaseData<QuestionnaireResponseResponseData>>(
    `/api/questionnaire/response/${id}`
  );
}
