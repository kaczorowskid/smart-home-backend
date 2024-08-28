/*
  Warnings:

  - Added the required column `name` to the `Blind` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Thermometer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blind" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Thermometer" ADD COLUMN     "name" TEXT NOT NULL;
