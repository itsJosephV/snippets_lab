-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "isDefault" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;
