-- AlterTable
ALTER TABLE "AnimalCare" ADD COLUMN     "caregiverId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Em andamento';

-- CreateTable
CREATE TABLE "Caregiver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caregiver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caregiver_email_key" ON "Caregiver"("email");

-- AddForeignKey
ALTER TABLE "AnimalCare" ADD CONSTRAINT "AnimalCare_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregiver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
