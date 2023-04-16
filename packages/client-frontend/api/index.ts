import {
  OAuthResponse,
  QuestionnaireResponseData,
  QuestionnaireResponseSubmitData,
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
  return request<ResponseBaseData<QuestionnaireResponseSubmitData>>(
    `/api/questionnaire/submit/${questionnaireId}`,
    {
      method: "POST",
      body: data,
    }
  );
}
