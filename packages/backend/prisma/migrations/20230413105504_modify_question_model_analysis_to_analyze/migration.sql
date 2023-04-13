/*
  Warnings:

  - You are about to drop the column `analysis` on the `Question` table. All the data in the column will be lost.
  - Added the required column `analyze` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "analysis",
ADD COLUMN     "analyze" VARCHAR(255) NOT NULL;
