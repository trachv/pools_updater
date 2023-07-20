-- CreateTable
CREATE TABLE "Pools" (
    "id" SERIAL NOT NULL,
    "pool" TEXT NOT NULL,
    "token0" JSONB NOT NULL,
    "token1" JSONB NOT NULL,

    CONSTRAINT "Pools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pools_id_key" ON "Pools"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pools_pool_key" ON "Pools"("pool");
