const uuid = require('uuid').v4
const geohash = require('geo-hash')

const CsmPoiResto = require('./../models/CsmPoiResto')
const CsmBusiness = require('./../models/CsmBusiness')

exports.newResto = (req,res) => {
    const {latitude,longitude,ownerId,
        restoName,poiCategory,establishmentType,outletType,opensAt,closesAt,openDays,cuisine,addressLine,city,country,zipcode,
        restaurantContactNumber,
        restoSpecialization,restoHistory,imageUrl} = req.body

        console.log(req.body)
    const id = uuid()
    try {
        console.log("1")
        const geoHashCode = geohash.encode(parseFloat(latitude),parseFloat(longitude))
        console.log("2")
        CsmBusiness.findById(ownerId,(err,data)=>{
            if(err) {conosle.log(err);return res.status(500).json({message:'Server error'})}
            console.log(ownerId, data)
            if(data.length === 1){
                const owner = data[0]
                console.log("3")
                console.log(owner)
                CsmPoiResto.newResto({id,latitude,longitude,geoHashCode,ownerId,
                    ownerContactNumber:owner.contact_number,
                    ownerEmail:owner.email,
                    restoName,poiCategory,establishmentType,outletType,opensAt,closesAt,openDays,cuisine,addressLine,city,country,zipcode,
                    restaurantContactNumber,restoSpecialization,restoHistory,imageUrl},
                    (err,data)=>{
                        if(err) {
                            console.log(err)
                            return res.status(500).json({message:err.message})
                        }
                        return res.json(data)
                    }
                )
            }else{
                console.log("exit")
                return res.status(500).json({message:'Something went wrong!, please try again.'})
            }
        })

    } catch (error) {
        return res.status(500).json({message:'Server error'})
    }
}

exports.allRestaurants = (req,res) => {
    CsmPoiResto.allRestaurants({},(err,data)=>{
        if(err) return res.status(500).json({message:err.message})
        return res.json(data)
    })
}

exports.findRestaurantById = (req,res) => {
    const id = req.params.id
    CsmPoiResto.findRestaurantById({id},(err,data)=>{
        if(err) return res.status(500).json({message:err.message})
        return res.json(data)
    })
}

exports.findRestaurantByOwnerId = (req,res) => {
    const ownerId= req.params.ownerId
    console.log(ownerId)
    CsmPoiResto.findRestaurantByOwnerId({ownerId},(err,data)=>{
        if(err) return res.status(500).json({message:err.message})
        return res.json(data)
    })
}