import { Question, User } from '../module'

export interface RegisterDto extends User {
  code: string
  type: 'email' | 'phone' | 'username'
  phone?: string
}

export interface CreateQuestionnaireDto {
  jsonData: JsonData
}

export interface CreateQuestionDto extends Question {}

export type JsonData = Record<string, any>

export * from './user'
export * from './questionnaireResponse'
export * from './questionnaireTag'
