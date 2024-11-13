/*
  Warnings:

  - You are about to drop the column `image` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('BACKYARD', 'BATHROOM', 'BEDROOM', 'KITCHEN', 'LIVINGROOM');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "image",
ADD COLUMN     "roomType" "RoomType" NOT NULL;
