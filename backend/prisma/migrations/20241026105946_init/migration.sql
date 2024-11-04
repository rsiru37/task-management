-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'REGULAR');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('OPEN', 'INPROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'OPEN',
    "uid" BIGINT,
    "due_date" DATE NOT NULL,
    "priority" "priority" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
