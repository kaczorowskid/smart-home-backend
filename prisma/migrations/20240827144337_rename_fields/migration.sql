/*
  Warnings:

  - You are about to drop the column `thermometerId` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `thermometerId` on the `ThermometerData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `Thermometer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `Thermometer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `ThermometerData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ThermometerData" DROP CONSTRAINT "ThermometerData_thermometerId_fkey";

-- DropIndex
DROP INDEX "Thermometer_thermometerId_key";

-- AlterTable
ALTER TABLE "Thermometer" DROP COLUMN "thermometerId",
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ThermometerData" DROP COLUMN "thermometerId",
ADD COLUMN     "deviceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Thermometer_deviceId_key" ON "Thermometer"("deviceId");

-- AddForeignKey
ALTER TABLE "ThermometerData" ADD CONSTRAINT "ThermometerData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Thermometer"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;
