-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('OVERTHINK', 'PROJECT', 'STORY', 'VENTING');

-- AlterTable
ALTER TABLE "Thought" ADD COLUMN     "readMinutes" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "tags" "Tags"[];
