/*
  Warnings:

  - Added the required column `duration` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "courseId" DROP NOT NULL;
