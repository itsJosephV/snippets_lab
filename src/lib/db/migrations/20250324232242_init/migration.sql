/*
  Warnings:

  - You are about to drop the `SavedView` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ViewType" ADD VALUE 'NORMAL';

-- DropForeignKey
ALTER TABLE "SavedView" DROP CONSTRAINT "SavedView_userId_fkey";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "filters" JSONB,
ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ViewType" NOT NULL;

-- DropTable
DROP TABLE "SavedView";
