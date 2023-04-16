import { PrismaClient } from '@prisma/client'

type TImage = {
    url: string
    reviewId: number
}

export default async function uploadImage(props: TImage) {
    const prisma = new PrismaClient()
    const { url, reviewId } = props

    await prisma.reviewImages
        .create({
            data: {
                url,
                reviewId,
            },
        })
        .then((image) => {
            return image
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}
