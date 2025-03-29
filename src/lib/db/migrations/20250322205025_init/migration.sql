-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('ALL', 'FAVORITES');

-- CreateTable
CREATE TABLE "SavedView" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ViewType" NOT NULL,
    "userId" TEXT NOT NULL,
    "filters" JSONB NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedView_userId_isPinned_idx" ON "SavedView"("userId", "isPinned");

-- CreateIndex
CREATE UNIQUE INDEX "SavedView_userId_type_key" ON "SavedView"("userId", "type");

-- AddForeignKey
ALTER TABLE "SavedView" ADD CONSTRAINT "SavedView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
