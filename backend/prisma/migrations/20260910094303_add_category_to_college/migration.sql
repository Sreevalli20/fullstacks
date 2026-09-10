-- AlterTable
ALTER TABLE "College" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "College_category_idx" ON "College"("category");
