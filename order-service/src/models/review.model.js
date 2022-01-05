const db = require('./../../config/db')

exports.writeReview = ({reviewId,poiId,customerId,customerName,customerEmail,customerImg,date,reviewText,
                        rating,upvotes},results) => {
                    const sql = `insert into csm_poi_reviews(poi_id,review_id,customer_id,customer_name,customer_email,customer_img,date,review_text,rating,upvotes) values
                    ('${poiId}','${reviewId}','${customerId}','${customerName}','${customerEmail}','${customerImg}','${date}','${reviewText}','${rating}','${upvotes}')`
                    db.query(sql,(err,res)=>{
                        if(err) return results(err,null)
                        return results(null,res)
                    })
}