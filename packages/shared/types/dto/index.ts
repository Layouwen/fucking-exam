import { Question } from '../data';
import { User } from '../module';

export interface CreateUserDto extends User {}

export interface RegisterDto extends User {}

export interface CreateQuestionnaireDto {
  jsonData: JsonData;
}

export interface CreateQuestionDto extends Question {}

export type JsonData = Record<string, any>;

export * from './questionnaireResponses';
