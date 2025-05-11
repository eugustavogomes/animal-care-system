-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "caregiverId" INTEGER;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregiver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
