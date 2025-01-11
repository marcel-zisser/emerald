/*
  Warnings:

  - Added the required column `title` to the `CriteriaGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CriteriaGroup" ADD COLUMN     "title" VARCHAR(128) NOT NULL;

-- AlterTable
ALTER TABLE "Criterion" ADD COLUMN     "type" VARCHAR(8) NOT NULL DEFAULT 'Binary';
