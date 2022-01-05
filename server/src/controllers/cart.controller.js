const kafka = require('./../../kafka/kafka')

exports.placeorder = (req,res) => {
    const cartData = req.body
    // kafka.sendKafkaRequest('orders',cartData,(err,data)=>{
    //     if(err) return res.status(400).json({message:err})
    //     return res.json(data)
    // })
} 