-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_folderId_fkey";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
