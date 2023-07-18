// export type { QuestionnaireResponses } from "@prisma/client";
import { Question } from './question'

export interface QuestionnaireResponses {
  questionnaireVersion: number
  questions: Question[]
  questionnaireId: number
  userId: number
  order: string[] | number[]
  answers: Record<string, string[]>
  fingerprint?: string
}
