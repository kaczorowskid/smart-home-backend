/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'VIEWER', 'EDITOR');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('dashboard:view', 'graphs:view', 'rooms:view', 'options:view', 'options:add_device', 'options:update_device', 'options:delete_device', 'options:add_room', 'options:update_room', 'options:delete_room', 'options:add_user', 'options:update_user', 'options:delete_user', 'settings:view');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" "RoleType" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermissionLink" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permission" "PermissionType" NOT NULL,

    CONSTRAINT "RolePermissionLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermissionLink_roleId_permission_key" ON "RolePermissionLink"("roleId", "permission");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermissionLink" ADD CONSTRAINT "RolePermissionLink_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
