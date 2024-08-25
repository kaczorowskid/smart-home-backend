-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "displayed_device_id" TEXT;

-- CreateTable
CREATE TABLE "DisplayedDevice" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "DisplayedDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DisplayedDevice_order_key" ON "DisplayedDevice"("order");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_displayed_device_id_fkey" FOREIGN KEY ("displayed_device_id") REFERENCES "DisplayedDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
