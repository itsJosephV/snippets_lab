/*
  Warnings:

  - Added the required column `isLocked` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "isLocked" BOOLEAN NOT NULL;
