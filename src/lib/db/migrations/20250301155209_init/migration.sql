/*
  Warnings:

  - You are about to drop the column `language` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `category` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "language",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "subCategory" TEXT NOT NULL;
