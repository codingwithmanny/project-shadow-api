/*
  Warnings:

  - Added the required column `orgFormId` to the `Nonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nonce" ADD COLUMN     "orgFormId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Nonce" ADD CONSTRAINT "Nonce_orgFormId_fkey" FOREIGN KEY ("orgFormId") REFERENCES "OrgForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
