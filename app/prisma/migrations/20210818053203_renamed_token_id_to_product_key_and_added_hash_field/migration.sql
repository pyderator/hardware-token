/*
  Warnings:

  - You are about to drop the column `tokenId` on the `HardwareToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productKey]` on the table `HardwareToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `HardwareToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productKey` to the `HardwareToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HardwareToken.tokenId_unique";

-- AlterTable
ALTER TABLE "HardwareToken" DROP COLUMN "tokenId",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "productKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HardwareToken.productKey_unique" ON "HardwareToken"("productKey");
