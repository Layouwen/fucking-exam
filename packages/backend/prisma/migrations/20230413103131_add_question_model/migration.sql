/*
  Warnings:

  - You are about to drop the column `name` on the `Questionnaire` table. All the data in the column will be lost.
  - Added the required column `paperName` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settings` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('singleChoice', 'multipleChoice', 'fillBlank', 'judgement', 'shortAnswer', 'essay', 'fileUpload');

-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "name",
ADD COLUMN     "paperName" VARCHAR(255) NOT NULL,
ADD COLUMN     "settings" JSONB NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "type" "QuestionType" NOT NULL,
    "settings" JSONB NOT NULL,
    "options" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "analysis" VARCHAR(255) NOT NULL,
    "questionnaireId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
