/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SnippetToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_B_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_SnippetToTag";

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE INDEX "Folder_collectionId_idx" ON "Folder"("collectionId");

-- CreateIndex
CREATE INDEX "Folder_collectionId_name_idx" ON "Folder"("collectionId", "name");

-- CreateIndex
CREATE INDEX "Snippet_folderId_idx" ON "Snippet"("folderId");

-- CreateIndex
CREATE INDEX "Snippet_folderId_isFavorite_idx" ON "Snippet"("folderId", "isFavorite");

-- CreateIndex
CREATE INDEX "Snippet_folderId_language_idx" ON "Snippet"("folderId", "language");
