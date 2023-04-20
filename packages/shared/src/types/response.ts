import { QuestionnaireResponses } from "./module";
import { Questionnaire } from "./data";

export interface ResponseBase {
  code: number;
  msg: string;
}

export interface ResponseBaseData<D> {
  code: number;
  msg: string;
  data: D;
}

export interface OAuthResponse {}

export interface QuestionnaireResponseData extends Questionnaire {}

export interface QuestionnaireSubmitResponseData {
  id: number;
}

export interface QuestionnaireResponseResponseData
  extends QuestionnaireResponses {
  questionnaire: Questionnaire;
}
