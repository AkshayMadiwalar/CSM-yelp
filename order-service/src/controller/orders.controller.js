const OrderModel = require('./../models/orders.model')

exports.findOrderByCustomerId = (req,res) => {
    const {customerId} = req.body
    OrderModel.findOrdersByCustomerId({customerId},(err,data)=>{
        if(err) return res.status(500).json({message:err})
        return res.json(data)
    })
}

exports.findOrderByRestaurantId =(req,res) => {
    const {restaurantId} = req.body
    OrderModel.findOrdersByRestaurantId({restaurantId},(err,data)=>{
        if(err) return res.status(500).json({message:err})
        return res.json(data)
    })
}

exports.updateOrderStatus = (req,res) => {
    const {orderId,status} = req.body
    OrderModel.updateOrderStatus({orderId,status},(err,data)=>{
        if(err) return res.status(500).json({message:err})
        return res.json(data)
    })
}