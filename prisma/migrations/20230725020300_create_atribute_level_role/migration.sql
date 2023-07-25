/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 99;

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
