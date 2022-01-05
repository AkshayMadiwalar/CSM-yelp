var db = require('../../config/db')

exports.newMenuItem = ({id,poiRestoId,name,price,specialIngredients,imageUrl},result) => {
    const sql = `insert into csm_poi_resto_menu(id,poi_resto_id,name,price,special_ingredients,img)
                values('${id}','${poiRestoId}','${name}','${price}','${specialIngredients}','${imageUrl}')`
            
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}

exports.findAllMenuByRestaurantId = ({restoId},result) => {
    const sql = `select * from csm_poi_resto_menu where poi_resto_id = '${restoId}'`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}