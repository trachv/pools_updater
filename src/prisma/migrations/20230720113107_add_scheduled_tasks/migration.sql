-- CreateTable
CREATE TABLE "ScheduledTasks" (
    "id" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledTasks_id_key" ON "ScheduledTasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledTasks_appName_taskName_key" ON "ScheduledTasks"("appName", "taskName");
