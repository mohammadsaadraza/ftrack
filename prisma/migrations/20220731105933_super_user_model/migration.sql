-- CreateTable
CREATE TABLE "SuperUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperUser_name_key" ON "SuperUser"("name");
