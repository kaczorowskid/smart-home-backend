/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Thermometer` table. All the data in the column will be lost.
  - Added the required column `device_id` to the `Thermometer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thermometer" DROP CONSTRAINT "Thermometer_deviceId_fkey";

-- AlterTable
ALTER TABLE "Thermometer" DROP COLUMN "deviceId",
ADD COLUMN     "device_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Thermometer" ADD CONSTRAINT "Thermometer_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
