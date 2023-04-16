import { PrismaClient } from '@prisma/client'

type TReview = {
    title: string
    description: string
    rating: number
}

export default async function createReview(props: TReview) {
    const prisma = new PrismaClient()
    const { title, description, rating } = props

    await prisma.reviews
        .create({
            data: {
                title,
                description,
                rating,
            },
        })
        .then((review) => {
            return review
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}
