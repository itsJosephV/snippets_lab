/*
  Warnings:

  - You are about to drop the column `category` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `subCategory` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SnippetToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCategoryId` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_B_fkey";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "category",
DROP COLUMN "subCategory",
ADD COLUMN     "subCategoryId" TEXT NOT NULL,
ALTER COLUMN "isFavorite" SET DEFAULT false;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_SnippetToTag";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_value_key" ON "SubCategory"("value");

-- CreateIndex
CREATE INDEX "Snippet_subCategoryId_folderId_idx" ON "Snippet"("subCategoryId", "folderId");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
