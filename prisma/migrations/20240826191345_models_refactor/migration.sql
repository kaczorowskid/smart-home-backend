/*
  Warnings:

  - You are about to drop the column `created_at` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Thermometer` table. All the data in the column will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thermometerId]` on the table `Thermometer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thermometerId` to the `Thermometer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Thermometer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thermometer" DROP CONSTRAINT "Thermometer_device_id_fkey";

-- AlterTable
ALTER TABLE "Thermometer" DROP COLUMN "created_at",
DROP COLUMN "date",
DROP COLUMN "device_id",
DROP COLUMN "humidity",
DROP COLUMN "temperature",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thermometerId" TEXT NOT NULL,
ADD COLUMN     "type" "DeviceType" NOT NULL DEFAULT 'THERMOMETER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Device";

-- CreateTable
CREATE TABLE "ThermometerData" (
    "id" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thermometerId" TEXT NOT NULL,

    CONSTRAINT "ThermometerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blind" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL DEFAULT 'BLIND',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blind_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Thermometer_thermometerId_key" ON "Thermometer"("thermometerId");

-- AddForeignKey
ALTER TABLE "ThermometerData" ADD CONSTRAINT "ThermometerData_thermometerId_fkey" FOREIGN KEY ("thermometerId") REFERENCES "Thermometer"("thermometerId") ON DELETE RESTRICT ON UPDATE CASCADE;
