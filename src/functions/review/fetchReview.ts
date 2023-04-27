import { PrismaClient } from '@prisma/client'

export default async function fetchReview() {
    const prisma = new PrismaClient()

    const review = await prisma.reviews.findMany({
        include: {
            images: true,
        },
    })

    return review
}
