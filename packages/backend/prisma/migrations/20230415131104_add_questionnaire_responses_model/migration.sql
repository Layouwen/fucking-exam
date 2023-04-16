-- CreateTable
CREATE TABLE "QuestionnaireResponses" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionnaireId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "order" JSONB NOT NULL,
    "answers" JSONB NOT NULL,

    CONSTRAINT "QuestionnaireResponses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionnaireResponses" ADD CONSTRAINT "QuestionnaireResponses_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireResponses" ADD CONSTRAINT "QuestionnaireResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
