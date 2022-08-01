-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('Income', 'Expense');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'PKR');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "TransactionCategory" NOT NULL,
    "currency" "CurrencyType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_type_date_idx" ON "Transaction"("type", "date");
