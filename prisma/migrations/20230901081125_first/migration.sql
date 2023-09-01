-- CreateTable
CREATE TABLE "CAM" (
    "cas_id" TEXT NOT NULL,
    "cas_type" TEXT,
    "file_type" TEXT,
    "address" TEXT,
    "email" TEXT,
    "name" TEXT,
    "mobile" TEXT,
    "statement_period" JSONB,

    CONSTRAINT "CAM_pkey" PRIMARY KEY ("cas_id")
);

-- CreateTable
CREATE TABLE "CAM_Folios" (
    "cas_id" TEXT NOT NULL,
    "kyc" TEXT,
    "pan" TEXT,
    "pankyc" TEXT,
    "amc" TEXT,
    "folio" TEXT NOT NULL,

    CONSTRAINT "CAM_Folios_pkey" PRIMARY KEY ("folio")
);

-- CreateTable
CREATE TABLE "CAM_Schemes" (
    "advisor" TEXT,
    "amfi" TEXT,
    "close" TEXT,
    "close_calculated" TEXT,
    "isin" TEXT NOT NULL,
    "open" TEXT,
    "rta" TEXT,
    "rta_code" TEXT,
    "scheme" TEXT,
    "folio_id" TEXT NOT NULL,
    "type" TEXT,
    "valuation" JSONB
);

-- CreateTable
CREATE TABLE "CAM_Transactions" (
    "id" SERIAL NOT NULL,
    "trans_scheme_id" TEXT NOT NULL,
    "amount" TEXT,
    "balance" TEXT,
    "date" TEXT,
    "description" TEXT,
    "dividend_rate" TEXT,
    "nav" TEXT,
    "type" TEXT,
    "units" TEXT,

    CONSTRAINT "CAM_Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CAM_cas_id_key" ON "CAM"("cas_id");

-- CreateIndex
CREATE UNIQUE INDEX "CAM_Folios_folio_key" ON "CAM_Folios"("folio");

-- CreateIndex
CREATE UNIQUE INDEX "CAM_Schemes_isin_key" ON "CAM_Schemes"("isin");

-- AddForeignKey
ALTER TABLE "CAM_Folios" ADD CONSTRAINT "CAM_Folios_cas_id_fkey" FOREIGN KEY ("cas_id") REFERENCES "CAM"("cas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CAM_Schemes" ADD CONSTRAINT "CAM_Schemes_folio_id_fkey" FOREIGN KEY ("folio_id") REFERENCES "CAM_Folios"("folio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CAM_Transactions" ADD CONSTRAINT "CAM_Transactions_trans_scheme_id_fkey" FOREIGN KEY ("trans_scheme_id") REFERENCES "CAM_Schemes"("isin") ON DELETE RESTRICT ON UPDATE CASCADE;
