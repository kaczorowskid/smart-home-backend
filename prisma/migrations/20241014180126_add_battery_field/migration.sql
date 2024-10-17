/*
  Warnings:

  - Added the required column `battery` to the `ThermometerData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThermometerData" ADD COLUMN     "battery" INTEGER NOT NULL;
