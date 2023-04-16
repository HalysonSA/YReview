import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routerImage from './src/routes/image/routes'
import routerReview from './src/routes/review/routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/image', routerImage)
app.use('/review', routerReview)

app.listen(3333, () => {
    console.log('Server listening on port 3333')
})
