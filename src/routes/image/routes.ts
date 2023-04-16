import multer from 'multer'
import { Router } from 'express'
import multerconfig from '../../config/multerconfig'
import uploadImage from '../../functions/image/uploadImage'

const routerImage = Router()

routerImage.get('/', (req, res) => {})

routerImage.post(
    '/:reviewID',
    multer(multerconfig).single('image'),
    (req, res) => {
        const file = req.file as Express.MulterS3.File
        const { reviewID } = req.params
        const { originalname, size, key, location: url = '' } = file

        uploadImage({
            url,
            reviewId: Number(reviewID),
        })
            .then((image) => {
                res.status(200).json({
                    status: 1,
                    message: 'Image uploaded',
                    data: image,
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: 0,
                    message: 'Image not uploaded',
                })
            })
    }
)

export default routerImage
