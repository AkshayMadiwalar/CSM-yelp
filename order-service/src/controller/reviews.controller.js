const ReviewModel = require('./../models/review.model')
const uuid = require('uuid').v4

exports.writeReview = (req,res) => {
    const {poiId,customerId,customerName,customerEmail,customerImg,reviewText,
        rating} = req.body
    
    const reviewId = uuid()
    const date = String(new Date())
    const upvotes = 0


    ReviewModel.writeReview({reviewId,poiId,customerId,customerName,customerEmail,customerImg,date,reviewText,
        rating,upvotes},(err,data) => {
            if(err) return res.status(500).json({message: err})
            return res.json(data)
        } )
}