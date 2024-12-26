/*
  Warnings:

  - You are about to drop the column `comments` on the `Criterion` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Criterion` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,checklistId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Review` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Checklist" ALTER COLUMN "description" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "CriteriaGroup" ALTER COLUMN "description" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Criterion" DROP COLUMN "comments",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ADD COLUMN     "uuid" UUID NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "ReviewResult" (
    "reviewId" UUID NOT NULL,
    "criterionId" UUID NOT NULL,
    "status" VARCHAR(16) NOT NULL,
    "comments" VARCHAR(256) NOT NULL,

    CONSTRAINT "ReviewResult_pkey" PRIMARY KEY ("reviewId","criterionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_checklistId_key" ON "Review"("userId", "checklistId");

-- AddForeignKey
ALTER TABLE "ReviewResult" ADD CONSTRAINT "ReviewResult_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewResult" ADD CONSTRAINT "ReviewResult_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
