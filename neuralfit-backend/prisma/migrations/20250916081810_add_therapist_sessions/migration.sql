-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "therapistSessionId" TEXT;

-- CreateTable
CREATE TABLE "public"."TherapistSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "therapistType" TEXT NOT NULL DEFAULT 'AI',
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TherapistSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_therapistSessionId_fkey" FOREIGN KEY ("therapistSessionId") REFERENCES "public"."TherapistSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TherapistSession" ADD CONSTRAINT "TherapistSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
