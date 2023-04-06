-- CreateTable
CREATE TABLE "GithubInfo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "githubId" VARCHAR(255) NOT NULL,
    "jsonData" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GithubInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubInfo_userId_key" ON "GithubInfo"("userId");

-- AddForeignKey
ALTER TABLE "GithubInfo" ADD CONSTRAINT "GithubInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
