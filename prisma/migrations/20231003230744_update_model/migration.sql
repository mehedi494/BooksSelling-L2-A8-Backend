/*
  Warnings:

  - You are about to drop the column `grenre` on the `books` table. All the data in the column will be lost.
  - Added the required column `genre` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "grenre",
ADD COLUMN     "genre" TEXT NOT NULL;
