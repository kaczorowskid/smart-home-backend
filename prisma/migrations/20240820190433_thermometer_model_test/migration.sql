/*
  Warnings:

  - Added the required column `date` to the `Thermometer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thermometer" ADD COLUMN     "date" TEXT NOT NULL;
