/*
  Warnings:

  - You are about to drop the column `roomId` on the `Blind` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Thermometer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blind" DROP CONSTRAINT "Blind_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Thermometer" DROP CONSTRAINT "Thermometer_roomId_fkey";

-- AlterTable
ALTER TABLE "Blind" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "Thermometer" DROP COLUMN "roomId";

-- CreateTable
CREATE TABLE "_BlindToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToThermometer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlindToRoom_AB_unique" ON "_BlindToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_BlindToRoom_B_index" ON "_BlindToRoom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToThermometer_AB_unique" ON "_RoomToThermometer"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToThermometer_B_index" ON "_RoomToThermometer"("B");

-- AddForeignKey
ALTER TABLE "_BlindToRoom" ADD CONSTRAINT "_BlindToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Blind"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlindToRoom" ADD CONSTRAINT "_BlindToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToThermometer" ADD CONSTRAINT "_RoomToThermometer_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToThermometer" ADD CONSTRAINT "_RoomToThermometer_B_fkey" FOREIGN KEY ("B") REFERENCES "Thermometer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
