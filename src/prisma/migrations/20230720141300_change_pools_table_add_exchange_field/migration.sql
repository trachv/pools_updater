/*
  Warnings:

  - A unique constraint covering the columns `[exchange,pool]` on the table `Pools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exchange` to the `Pools` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pools_pool_key";

-- AlterTable
ALTER TABLE "Pools" ADD COLUMN     "exchange" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pools_exchange_pool_key" ON "Pools"("exchange", "pool");
