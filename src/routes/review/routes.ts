import { Router } from 'express'
import createReview from '../../functions/review/createReview'

const routerReview = Router()

routerReview.get('/', (req, res) => {})

routerReview.post('/', (req, res) => {
    const { title, description, rating } = req.body

    createReview({
        title,
        description,
        rating,
    })
        .then((review) => {
            res.status(200).json({
                status: 1,
                message: 'Review created',
                data: review,
            })
        })
        .catch((err) => {
            res.status(400).json({
                status: 0,
                message: 'Review not created',
            })
        })
})

export default routerReview
