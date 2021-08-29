/*
  Warnings:

  - You are about to alter the column `amount` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "amount" SET DEFAULT 1000,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;
