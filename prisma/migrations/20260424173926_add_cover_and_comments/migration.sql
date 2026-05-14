/*
  Warnings:

  - You are about to drop the column `autor` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `thoughtID` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `author` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoughtId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_thoughtID_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "autor",
DROP COLUMN "thoughtID",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "thoughtId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
