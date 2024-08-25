/*
  Warnings:

  - Made the column `device_id` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "device_id" SET NOT NULL;
