const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

const CsmUser = require('./../models/CsmUser')
const CsmBusiness = require('./../models/CsmBusiness')

exports.createUser = function(req,res){
    const {firstName,lastName,email,password,dob,city,country} = req.body
    try {
        CsmUser.findByEmail(email,async function(err,data){
            if(err) res.send(err)
            if(data.length>0){
                return res.status(400).json({message:'User Exists'})
            }
            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hash(password,salt)
    
            CsmUser.newUser({firstName,lastName,email,encryptedPassword,dob,city,country},function(err,data){
                const payload = {
                    user: {
                        id:data
                    }
                }
                jwt.sign(payload,
                    config.jwtSecret,
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err
                        return res.json({token})
                    }
                    )
            })
        })
    } catch (err) {
        res.status(500).json({message:'Server Error'})
    }

}

exports.registerBusiness = (req,res) => {
    const {firstName,lastName,email,password,businessName,businessCategory,addressLine1,addressLine2,city,country,contactNo} = req.body
    try {
        CsmBusiness.findByEmail(email,async (err,data)=>{
            if(err) return res.status(500).json({message:'Server Error'})
            if(data.length>0){
                return res.status(400).json({message:'Business User already exists'})
            }

            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hash(password,salt)
            const id = uuid()
            CsmBusiness.newBusiness({id,firstName,lastName,email,encryptedPassword,businessName,businessCategory,addressLine1,addressLine2,city,country,contactNo},(err,data)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({message:'Server error'})
                }

                const payload = {
                    user: {
                        id:id
                    }
                }
                jwt.sign(payload,
                    config.jwtSecret,
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err
                        return res.json({token})
                    }
                    )
            })

        })
    } catch (error) {
        
    }
}

