/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[amount]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hardwareTokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hardwareTokenId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('BLOCKED', 'NOT_ACTIVE', 'ACTIVE');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "accountNumber" BIGINT NOT NULL,
ADD COLUMN     "amount" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "contactNumber" BIGINT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hardwareTokenId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT E'NOT_ACTIVE',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAndTranscations" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "fromUser" BIGINT NOT NULL,
    "toUser" BIGINT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HardwareToken" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "isActive" "STATUS" NOT NULL DEFAULT E'NOT_ACTIVE',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HardwareToken.tokenId_unique" ON "HardwareToken"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.contactNumber_unique" ON "User"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User.accountNumber_unique" ON "User"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User.amount_unique" ON "User"("amount");

-- CreateIndex
CREATE UNIQUE INDEX "User_hardwareTokenId_unique" ON "User"("hardwareTokenId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("hardwareTokenId") REFERENCES "HardwareToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAndTranscations" ADD FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
