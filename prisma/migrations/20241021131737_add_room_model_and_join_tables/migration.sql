/*
  Warnings:

  - You are about to drop the `_BlindToRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomToThermometer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlindToRoom" DROP CONSTRAINT "_BlindToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlindToRoom" DROP CONSTRAINT "_BlindToRoom_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToThermometer" DROP CONSTRAINT "_RoomToThermometer_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToThermometer" DROP CONSTRAINT "_RoomToThermometer_B_fkey";

-- DropTable
DROP TABLE "_BlindToRoom";

-- DropTable
DROP TABLE "_RoomToThermometer";

-- CreateTable
CREATE TABLE "RoomOnThermometers" (
    "roomId" TEXT NOT NULL,
    "thermometerId" TEXT NOT NULL,

    CONSTRAINT "RoomOnThermometers_pkey" PRIMARY KEY ("roomId","thermometerId")
);

-- CreateTable
CREATE TABLE "RoomOnBlinds" (
    "roomId" TEXT NOT NULL,
    "blindId" TEXT NOT NULL,

    CONSTRAINT "RoomOnBlinds_pkey" PRIMARY KEY ("roomId","blindId")
);

-- AddForeignKey
ALTER TABLE "RoomOnThermometers" ADD CONSTRAINT "RoomOnThermometers_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomOnThermometers" ADD CONSTRAINT "RoomOnThermometers_thermometerId_fkey" FOREIGN KEY ("thermometerId") REFERENCES "Thermometer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomOnBlinds" ADD CONSTRAINT "RoomOnBlinds_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomOnBlinds" ADD CONSTRAINT "RoomOnBlinds_blindId_fkey" FOREIGN KEY ("blindId") REFERENCES "Blind"("id") ON DELETE CASCADE ON UPDATE CASCADE;
