-- DropForeignKey
ALTER TABLE "QuestionnaireResponses" DROP CONSTRAINT "QuestionnaireResponses_userId_fkey";

-- AlterTable
ALTER TABLE "QuestionnaireResponses" ADD COLUMN     "fingerprint" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionnaireResponses" ADD CONSTRAINT "QuestionnaireResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
