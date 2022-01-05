const uuid = require('uuid').v4

const CsmPoiRestoMenu = require('./../models/CsmPoiRestoMenu')

exports.newMenuItem = (req,res) => {
    const {poiRestoId,name,specialIngredients,price,imageUrl} = req.body
    try {
        const id = uuid()
        CsmPoiRestoMenu.newMenuItem({id,poiRestoId,name,specialIngredients,price,imageUrl},(err,data)=>{
            if(err) {console.log(err);return res.status(500).json({message:err.message})}
            return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:err.message})
    }
}

exports.findAllMenuByRestaurantId = (req,res) => {
    const restoId = req.params.restoId
    CsmPoiRestoMenu.findAllMenuByRestaurantId({restoId},(err,data)=>{
        if(err) {console.log(err);return res.status(500).json({message:err.message})}
        return res.json(data)
    })
}