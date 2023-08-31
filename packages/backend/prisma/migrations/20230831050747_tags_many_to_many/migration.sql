/*
  Warnings:

  - You are about to drop the column `questionnaireId` on the `QuestionnaireTag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `QuestionnaireTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionnaireTag" DROP CONSTRAINT "QuestionnaireTag_questionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireTag" DROP CONSTRAINT "QuestionnaireTag_userId_fkey";

-- AlterTable
ALTER TABLE "QuestionnaireTag" DROP COLUMN "questionnaireId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_QuestionnaireToQuestionnaireTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionnaireToQuestionnaireTag_AB_unique" ON "_QuestionnaireToQuestionnaireTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionnaireToQuestionnaireTag_B_index" ON "_QuestionnaireToQuestionnaireTag"("B");

-- AddForeignKey
ALTER TABLE "_QuestionnaireToQuestionnaireTag" ADD CONSTRAINT "_QuestionnaireToQuestionnaireTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireToQuestionnaireTag" ADD CONSTRAINT "_QuestionnaireToQuestionnaireTag_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionnaireTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
