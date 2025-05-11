-- CreateTable
CREATE TABLE "AnimalCare" (
    "animalId" INTEGER NOT NULL,
    "careId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimalCare_pkey" PRIMARY KEY ("animalId","careId")
);

-- AddForeignKey
ALTER TABLE "AnimalCare" ADD CONSTRAINT "AnimalCare_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalCare" ADD CONSTRAINT "AnimalCare_careId_fkey" FOREIGN KEY ("careId") REFERENCES "Care"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
