import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const s3Config = new S3Client({
    region: `${process.env.AWS_DEFAULT_REGION}`,
    credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    },
})

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${uuidv4()} - ${path.extname(file.originalname)}`)
        },
    }),
    s3: multerS3({
        s3: s3Config,
        bucket: `${process.env.AWS_BUCKET_NAME}`,
        acl: 'public-read',
        key: (req, file, cb) => {
            const fileName = `${uuidv4()}-${file.originalname}`

            cb(null, fileName)
        },
    }),
}

export default {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    //@ts-ignore
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type.'), false)
        }
    },
    storage: storageTypes['s3'], // local or s3
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
}
