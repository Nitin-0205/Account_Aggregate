-- CreateTable
CREATE TABLE "Cdsl_Equities" (
    "id" TEXT NOT NULL,
    "cdslEquityId" TEXT NOT NULL,
    "CurrentBalance" TEXT,
    "Isin" TEXT,
    "IsinName" TEXT,
    "Value" TEXT,

    CONSTRAINT "Cdsl_Equities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cdsl_Equities" ADD CONSTRAINT "Cdsl_Equities_cdslEquityId_fkey" FOREIGN KEY ("cdslEquityId") REFERENCES "Cdsl_Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
