const jwt = require('jsonwebtoken')
const config = require('./../config/default')

const CsmBusiness = require('./../src/models/CsmBusiness')

module.exports = (req,res,next) => {

    //Get token from the headers
    const token = req.header('access-token')

    if(!token){
        return res.status(401).json({message:'Unauthorised access'})
    }

    //Verify token
    try {
        const decoded = jwt.verify(token,config.jwtSecret)
        const id = decoded.user.id
        CsmBusiness.findById(id,(err,data)=>{
            if(data.length === 1){
                req.user = decoded.user
                next()
            }else{
                return res.status(401).json({message:'Unauthorised access'})
            }
        })
    } catch (error) {
        return res.status(401).json({message:'Unauthorised access'})
    }
}
