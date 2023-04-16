-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewImages" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "ReviewImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReviewImages" ADD CONSTRAINT "ReviewImages_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
