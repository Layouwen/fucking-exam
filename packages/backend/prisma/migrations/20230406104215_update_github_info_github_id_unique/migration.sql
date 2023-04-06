/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `GithubInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GithubInfo_githubId_key" ON "GithubInfo"("githubId");
