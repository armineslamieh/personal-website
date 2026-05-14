-- AlterTable
ALTER TABLE "Thought" ADD COLUMN     "coverImage" TEXT;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "autor" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoughtID" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_thoughtID_fkey" FOREIGN KEY ("thoughtID") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
