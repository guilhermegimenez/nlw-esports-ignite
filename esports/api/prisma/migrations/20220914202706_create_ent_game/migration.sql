-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL DEFAULT 'autoincrement',
    "title" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
