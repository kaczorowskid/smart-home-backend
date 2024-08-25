/*
  Warnings:

  - You are about to drop the column `displayed_device_id` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `DisplayedDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `DisplayedDevice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_displayed_device_id_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "displayed_device_id";

-- AlterTable
ALTER TABLE "DisplayedDevice" ADD COLUMN     "device_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DisplayedDevice_device_id_key" ON "DisplayedDevice"("device_id");

-- AddForeignKey
ALTER TABLE "DisplayedDevice" ADD CONSTRAINT "DisplayedDevice_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
