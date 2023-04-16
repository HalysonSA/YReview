import { PrismaClient } from '@prisma/client'

type TReview = {
    title: string
    description: string
    rating: number
}

export default async function createReview(props: TReview) {
    const prisma = new PrismaClient()
    const { title, description, rating } = props

    const review = await prisma.reviews.create({
        data: {
            title,
            description,
            rating,
        },
    })

    return review
}
