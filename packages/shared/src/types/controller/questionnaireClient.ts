// get questionnaire list
import {
  Question,
  Questionnaire,
  QuestionnaireModel,
  QuestionnaireResponses,
  UserModel,
} from "../module";
import { OmitUserSecretFiled } from "../utils";

export interface QuestionnaireClientListResponseData {
  // TODO Questionnaire
  list: any[];
}

// get questionnaire by id
export interface QuestionnaireClientResponseData extends QuestionnaireModel {
  user: OmitUserSecretFiled<UserModel>;
}

// submit questionnaire
export interface QuestionnaireClientSubmitRequestParams {
  id: string;
}

export interface QuestionnaireClientSubmitRequestBody {
  order: string[] | number[];
  answers: Record<string, string[]>;
  questionnaireVersion: number;
  questions: Question[];
}

export interface QuestionnaireClientSubmitResponseData {
  id: number;
}

// TODO Extraction questionnaireResponse controller
// get questionnaire response
export interface QuestionClientQuestionnaireResponseParams {
  id: string;
}

export interface QuestionnaireClientQuestionnaireResponseResponseData
  extends Omit<QuestionnaireResponses, "questionnaireId"> {
  questionnaire: Questionnaire;
}
