import {
  OAuthResponse,
  QuestionnaireResponseData,
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
