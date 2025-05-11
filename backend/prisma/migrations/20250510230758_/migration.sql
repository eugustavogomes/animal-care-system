/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `habitat` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Caregiver` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Caregiver` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Caregiver` table. All the data in the column will be lost.
  - You are about to drop the `AnimalCare` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Care` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AnimalCare" DROP CONSTRAINT "AnimalCare_animalId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalCare" DROP CONSTRAINT "AnimalCare_careId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalCare" DROP CONSTRAINT "AnimalCare_caregiverId_fkey";

-- DropIndex
DROP INDEX "Caregiver_email_key";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "birthDate",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "habitat",
DROP COLUMN "species",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Care" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Caregiver" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "AnimalCare";

-- CreateTable
CREATE TABLE "AnimalCareAssignment" (
    "id" SERIAL NOT NULL,
    "careId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "caregiverId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'Em andamento',

    CONSTRAINT "AnimalCareAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimalCareAssignment" ADD CONSTRAINT "AnimalCareAssignment_careId_fkey" FOREIGN KEY ("careId") REFERENCES "Care"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalCareAssignment" ADD CONSTRAINT "AnimalCareAssignment_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalCareAssignment" ADD CONSTRAINT "AnimalCareAssignment_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregiver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
