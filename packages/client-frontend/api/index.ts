import {
  OAuthResponse,
  QuestionnaireResponseData,
  QuestionnaireResponseResponseData,
  QuestionnaireSubmitResponseData,
  QuestionQuestion,
  ResponseBaseData,
} from "@fucking-exam/shared";

import { request } from "~/utils";

export function loginApi(code: string) {
  return request<ResponseBaseData<OAuthResponse>>("/api/oauth/github", {
    method: "POST",
    body: { code },
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
