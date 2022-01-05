const db = require('./../../config/db')

exports.placeOrder = ({orderId,customerId,restaurantId,price,menuItems,date},results) => {
    const sql = `insert into csm_poi_resto_orders(order_id,customer_id,restaurant_id,price,menu_items,date,status) 
    values('${orderId}','${customerId}','${restaurantId}','${price}','${menuItems}','${date}','received')`
    db.query(sql,(err,res)=>{
        if(err) return results(err,null)
        return results(null,res)
    })
}

exports.findOrdersByCustomerId = ({customerId},results) => {
    const sql = `select * from csm_poi_resto_orders where customer_id = '${customerId}'`
    db.query(sql,(err,res)=>{
        if(err) return results(err,null)
        return results(null,res)
    })
}

exports.findOrdersByRestaurantId = ({restaurantId},results) => {
    const sql = `select * from csm_poi_resto_orders where restaurant_id = '${restaurantId}'`
    db.query(sql,(err,res)=>{
        if(err) return results(err,null)
        return results(null,res)
    })
}

exports.updateOrderStatus = ({status,orderId},results) => {
    const sql = `update csm_poi_resto_orders set status = '${status}' where order_id = '${orderId}'`
    db.query(sql,(err,res)=>{
        if(err) return results(err,null)
        return results(null,res)
    })
}