-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "aid" BIGINT;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_aid_fkey" FOREIGN KEY ("aid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
