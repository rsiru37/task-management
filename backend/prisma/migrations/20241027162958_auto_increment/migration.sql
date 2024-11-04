-- AlterTable
CREATE SEQUENCE tasks_id_seq;
ALTER TABLE "Tasks" ALTER COLUMN "id" SET DEFAULT nextval('tasks_id_seq');
ALTER SEQUENCE tasks_id_seq OWNED BY "Tasks"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
