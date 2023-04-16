import { PrismaClient } from '@prisma/client'

type TImage = {
    url: string
    reviewId: number
}

export default async function uploadImage(props: TImage) {
    const prisma = new PrismaClient()
    const { url, reviewId } = props

    const image = await prisma.reviewImages.create({
        data: {
            url,
            reviewId,
        },
    })

    return image
}
