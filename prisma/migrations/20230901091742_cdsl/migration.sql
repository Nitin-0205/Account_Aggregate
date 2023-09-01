-- CreateTable
CREATE TABLE "InvestorInfo" (
    "id" TEXT NOT NULL,
    "Address" TEXT,
    "Name" TEXT,
    "PinCode" TEXT,
    "StatementPeriod" JSONB,

    CONSTRAINT "InvestorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountInfo" (
    "id" TEXT NOT NULL,
    "investorInfoId" TEXT NOT NULL,
    "GrandTotal" TEXT,
    "TotalAccount" TEXT,

    CONSTRAINT "AccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "accountInfoId" TEXT NOT NULL,
    "AccountClass" TEXT,
    "AccountType" TEXT,
    "Value" TEXT,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CdslInfo" (
    "id" TEXT NOT NULL,
    "TotalAccount" TEXT,
    "TotalValue" TEXT,

    CONSTRAINT "CdslInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cdsl_Accounts" (
    "id" TEXT NOT NULL,
    "cdslInfoId" TEXT NOT NULL,
    "Account_Status" TEXT,
    "BO_ID" TEXT,
    "BO_Status" TEXT,
    "BO_Sub_Status" TEXT,
    "BSDA" TEXT,
    "DP_Name" TEXT,
    "Email_Id" TEXT,
    "Frozen_Status" TEXT,
    "Mobile_No" TEXT,
    "Nominee" TEXT,
    "RGESS" TEXT,

    CONSTRAINT "Cdsl_Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NsdlInfo" (
    "id" TEXT NOT NULL,
    "TotalAccount" TEXT,
    "TotalValue" TEXT,

    CONSTRAINT "NsdlInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nsdl_Accounts" (
    "id" TEXT NOT NULL,
    "nsdlInfoId" TEXT NOT NULL,
    "Account_Status" TEXT,
    "BO_ID" TEXT,
    "BO_Status" TEXT,
    "BSDA" TEXT,
    "ClientId" TEXT,
    "DP_Name" TEXT,
    "DPID" TEXT,
    "Email_Id" TEXT,

    CONSTRAINT "Nsdl_Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nsdl_Equities" (
    "id" TEXT NOT NULL,
    "nsdlAccountId" TEXT NOT NULL,
    "CurrentBalance" TEXT,
    "Isin" TEXT,
    "IsinName" TEXT,
    "Value" TEXT,

    CONSTRAINT "Nsdl_Equities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutualFundFolioInfo" (
    "id" TEXT NOT NULL,
    "TotalAccount" TEXT,
    "TotalValue" TEXT,

    CONSTRAINT "MutualFundFolioInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutualFund_Accounts" (
    "id" TEXT NOT NULL,
    "mutualFundFolioInfoId" TEXT NOT NULL,
    "AccountClass" TEXT,
    "AccountType" TEXT,
    "Value" TEXT,
    "TotalMutualFundFolio" TEXT,

    CONSTRAINT "MutualFund_Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutualFundFolioList" (
    "id" TEXT NOT NULL,
    "mutualFundAccountId" TEXT NOT NULL,
    "ArnCode" TEXT,
    "ClosingBalance" TEXT,
    "FolioNumber" TEXT,
    "InvestmentValue" TEXT,
    "Isin" TEXT,
    "IsinName" TEXT,
    "Nav" TEXT,
    "Value" TEXT,

    CONSTRAINT "MutualFundFolioList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD CONSTRAINT "AccountInfo_investorInfoId_fkey" FOREIGN KEY ("investorInfoId") REFERENCES "InvestorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_accountInfoId_fkey" FOREIGN KEY ("accountInfoId") REFERENCES "AccountInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cdsl_Accounts" ADD CONSTRAINT "Cdsl_Accounts_cdslInfoId_fkey" FOREIGN KEY ("cdslInfoId") REFERENCES "CdslInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nsdl_Accounts" ADD CONSTRAINT "Nsdl_Accounts_nsdlInfoId_fkey" FOREIGN KEY ("nsdlInfoId") REFERENCES "NsdlInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nsdl_Equities" ADD CONSTRAINT "Nsdl_Equities_nsdlAccountId_fkey" FOREIGN KEY ("nsdlAccountId") REFERENCES "Nsdl_Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutualFund_Accounts" ADD CONSTRAINT "MutualFund_Accounts_mutualFundFolioInfoId_fkey" FOREIGN KEY ("mutualFundFolioInfoId") REFERENCES "MutualFundFolioInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutualFundFolioList" ADD CONSTRAINT "MutualFundFolioList_mutualFundAccountId_fkey" FOREIGN KEY ("mutualFundAccountId") REFERENCES "MutualFund_Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
