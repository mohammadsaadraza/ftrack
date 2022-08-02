/*
  Warnings:

  - You are about to drop the column `name` on the `SuperUser` table. All the data in the column will be lost.
  - Added the required column `type` to the `SuperUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Viewer');

-- DropIndex
DROP INDEX "SuperUser_name_key";

-- AlterTable
ALTER TABLE "SuperUser" DROP COLUMN "name",
ADD COLUMN     "type" "UserRole" NOT NULL;
