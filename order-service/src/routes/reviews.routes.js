const express = require('express')
const router = express.Router()

const auth = require('./../../middleware/auth')

const ReviewsController = require('./../controller/reviews.controller')


router.post('/writeReview',auth,ReviewsController.writeReview)

module.exports = router