/*
  Warnings:

  - Changed the type of `language` on the `Snippet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT', 'YAML', 'PYTHON', 'RUST', 'GO', 'JAVA', 'CSHARP', 'PHP', 'ANGULAR', 'SQL', 'VUE', 'CSS', 'HTML', 'MARKDOWN', 'JSON', 'XML', 'CPP', 'SASS', 'SVELTE');

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- CreateIndex
CREATE INDEX "Snippet_folderId_language_idx" ON "Snippet"("folderId", "language");
