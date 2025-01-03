/*
  Warnings:

  - The values [dashboard:view,graphs:view,rooms:view,options:view,options:add_device,options:update_device,options:delete_device,options:add_room,options:update_room,options:delete_room,options:add_user,options:update_user,options:delete_user,settings:view] on the enum `PermissionType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PermissionType_new" AS ENUM ('DASHBOARD_VIEW', 'GRAPHS_VIEW', 'ROOMS_VIEW', 'OPTIONS_VIEW', 'OPTIONS_ADD_DEVICE', 'OPTIONS_UPDATE_DEVICE', 'OPTIONS_DELETE_DEVICE', 'OPTIONS_ADD_ROOM', 'OPTIONS_UPDATE_ROOM', 'OPTIONS_DELETE_ROOM', 'OPTIONS_ADD_USER', 'OPTIONS_UPDATE_USER', 'OPTIONS_DELETE_USER', 'SETTINGS_VIEW');
ALTER TABLE "RolePermissionLink" ALTER COLUMN "permission" TYPE "PermissionType_new" USING ("permission"::text::"PermissionType_new");
ALTER TYPE "PermissionType" RENAME TO "PermissionType_old";
ALTER TYPE "PermissionType_new" RENAME TO "PermissionType";
DROP TYPE "PermissionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RoleType";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
