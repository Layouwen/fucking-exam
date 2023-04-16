-- AlterTable
ALTER TABLE "QuestionnaireResponses" ADD COLUMN     "questions" JSONB NOT NULL DEFAULT '{}';
