/*
  Warnings:

  - Added the required column `investorInfoId` to the `CdslInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investorInfoId` to the `MutualFundFolioInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investorInfoId` to the `NsdlInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CdslInfo" ADD COLUMN     "investorInfoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MutualFundFolioInfo" ADD COLUMN     "investorInfoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NsdlInfo" ADD COLUMN     "investorInfoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CdslInfo" ADD CONSTRAINT "CdslInfo_investorInfoId_fkey" FOREIGN KEY ("investorInfoId") REFERENCES "InvestorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NsdlInfo" ADD CONSTRAINT "NsdlInfo_investorInfoId_fkey" FOREIGN KEY ("investorInfoId") REFERENCES "InvestorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutualFundFolioInfo" ADD CONSTRAINT "MutualFundFolioInfo_investorInfoId_fkey" FOREIGN KEY ("investorInfoId") REFERENCES "InvestorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
