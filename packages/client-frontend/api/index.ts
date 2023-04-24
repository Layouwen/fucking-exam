import {
  AuthLoginRequestBody,
  AuthLoginResponseData,
  AuthRegisterRequestBody,
  AuthRegisterResponseData,
  OAuthGithubResponseData,
  QuestionnaireClientResponseData,
  QuestionnaireClientListResponseData,
  QuestionnaireClientQuestionnaireResponseResponseData,
  QuestionnaireClientSubmitResponseData,
  QuestionnaireClientSubmitRequestBody,
  ResponseBase,
  ResponseBaseData,
} from "@fucking-exam/shared";

import { request } from "~/utils";

export function loginApi(data: AuthLoginRequestBody) {
  return request<ResponseBaseData<AuthLoginResponseData>>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function registerApi(data: Omit<AuthRegisterRequestBody, "type">) {
  return request<ResponseBaseData<AuthRegisterResponseData>>(
    "/api/auth/register",
    {
      method: "POST",
      body: {
        type: "email",
        ...data,
      },
    }
  );
}

export function sendEmailCodeApi(email: string) {
  return request<ResponseBase>("/api/auth/email/send", {
    method: "POST",
    body: { email },
  });
}

export function postOauthGithubLoginApi(code: string) {
  return request<ResponseBaseData<OAuthGithubResponseData>>(
    "/api/oauth/github",
    {
      method: "POST",
      body: { code },
    }
  );
}

export function getQuestionnaireListApi() {
  return request<ResponseBaseData<QuestionnaireClientListResponseData>>(
    `/api/questionnaire`
  );
}

export function getQuestionnaireApi(id: string) {
  return request<ResponseBaseData<QuestionnaireClientResponseData>>(
    `/api/questionnaire/${id}`
  );
}

export function postQuestionnaireSubmitApi(
  questionnaireId: number,
  data: QuestionnaireClientSubmitRequestBody
) {
  return request<ResponseBaseData<QuestionnaireClientSubmitResponseData>>(
    `/api/questionnaire/submit/${questionnaireId}`,
    {
      method: "POST",
      body: data,
    }
  );
}

export function getQuestionnaireResponseApi(id: string) {
  return request<
    ResponseBaseData<QuestionnaireClientQuestionnaireResponseResponseData>
  >(`/api/questionnaire/response/${id}`);
}
