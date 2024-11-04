/*
  Warnings:

  - The primary key for the `Tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `SmallInt`.
  - You are about to alter the column `uid` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `SmallInt`.
  - You are about to alter the column `aid` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `SmallInt`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `SmallInt`.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_aid_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_uid_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE SMALLINT,
ALTER COLUMN "uid" SET DATA TYPE SMALLINT,
ALTER COLUMN "aid" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tasks_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_aid_fkey" FOREIGN KEY ("aid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
