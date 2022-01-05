var db = require('../../config/db')


exports.newResto = ({id,latitude,longitude,geoHashCode,ownerId,ownerContactNumber,ownerEmail,
    restoName,poiCategory,establishmentType,outletType,opensAt,closesAt,openDays,cuisine,addressLine,city,country,zipcode,
    restaurantContactNumber,restoSpecialization,restoHistory,imageUrl},result) => {
        
        const sql = `insert into csm_poi_resto(id,latitude,longitude,geohash,owner_id,owner_contact_number,owner_email,
            resto_name,poi_category,establishment_type,outlet_type,opens_at,closes_at,open_days,cuisine,addressLine,city,country,zipcode,
            restaurant_contact_number,resto_specialization,resto_history,img_url)
            values('${id}','${latitude}','${longitude}','${geoHashCode}','${ownerId}','${ownerContactNumber}','${ownerEmail}','${restoName}',
            '${poiCategory}','${establishmentType}','${outletType}','${opensAt}','${closesAt}','${openDays}',
            '${cuisine}','${addressLine}','${city}','${country}',
            '${zipcode}','${restaurantContactNumber}','${restoSpecialization}','${restoHistory}','${imageUrl}')`
            
        db.query(sql,(err,res)=>{
            if(err) {
                console.log("Error ankda",err)
                return result(err,null)
            }
            return result(null,res)
        })
}

exports.allRestaurants = ({},result) => {
    const sql = `select * from csm_poi_resto`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}

exports.findRestaurantById = ({id},result) => {
    console.log("id",id)
    const sql = `select * from csm_poi_resto where id = '${id}'`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    }) 
}

exports.findRestaurantByOwnerId = ({ownerId},result) => {
    const sql = `select * from csm_poi_resto where owner_id = '${ownerId}'`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}