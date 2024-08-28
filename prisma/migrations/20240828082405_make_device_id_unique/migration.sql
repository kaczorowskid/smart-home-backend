/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `Blind` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blind_deviceId_key" ON "Blind"("deviceId");
