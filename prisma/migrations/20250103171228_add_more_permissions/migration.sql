-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_VIEW_DEVICES';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_VIEW_ROOMS';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_VIEW_USERS';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_VIEW_ROLES';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_ADD_ROLE';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_UPDATE_ROLE';
ALTER TYPE "PermissionType" ADD VALUE 'OPTIONS_DELETE_ROLE';
