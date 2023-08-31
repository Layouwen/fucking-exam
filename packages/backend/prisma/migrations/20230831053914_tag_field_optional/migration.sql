/*
  Warnings:

  - You are about to drop the column `beColor` on the `QuestionnaireTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionnaireTag" DROP COLUMN "beColor",
ADD COLUMN     "bgColor" VARCHAR(255),
ALTER COLUMN "textColor" DROP NOT NULL;
