-- AlterTable
ALTER TABLE "Questionnaire" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuestionnaireResponses" ADD COLUMN     "questionnaireVersion" INTEGER NOT NULL DEFAULT 0;
