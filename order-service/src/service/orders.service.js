const OrdersModel = require('../models/orders.model')
const uuid = require('uuid').v4

exports.placeOrder = (payload,cb) => {

    const content = payload.payload
    const customerId = content.customer
    var restaurantId = ""
    var price = 0;
    var menuItems = ""

    var c = 1
    content.cart.map(item=>{
        restaurantId = item.poi_resto_id
        price = price + parseInt(item.price)
        
        menuItems = menuItems.concat(item.name+'##'+item.price+'##'+item.img)
       
        if(c != content.cart.length){
            menuItems = menuItems.concat("%&&&%")
        }
        c = c + 1
    })
    
    const orderId = uuid()
    const date = String(new Date())

    OrdersModel.placeOrder({orderId,customerId,restaurantId,price,menuItems,date},(err,data)=>{
        if(err) {console.log(err);return cb(err,null)}
        return cb(null,data)
    })
}