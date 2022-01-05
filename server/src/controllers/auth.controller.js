const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/default')

const CsmUser = require('./../models/CsmUser')
const CsmBusiness = require('./../models/CsmBusiness')

exports.login = (req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
    CsmUser.findByEmail(email,async (err,data)=>{
        if(err) return res.status(500).json({message:'Server Error'})

        if(data.length === 0){
            return res.status(400).json({message:'Invalid Credentials!'})
        }

        let user = data[0]
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials!'})
        }

        const payload = {
            user: {
                id:user.id
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
}


exports.loginBusiness = (req,res) => {
    const {email,password} = req.body
    try {
        CsmBusiness.findByEmail(email,async (err,data)=>{
            if(err) return res.status(500).json({message:'Server Error'})
            if(data.length === 0) return res.status(400).json({message:'Invalid Credentials!'})

            const user = data[0]
            const match =  await bcrypt.compare(password,user.password)
            if(!match){
                return res.status(400).json({message:'Invalid Credentials'})
            }

            const payload = {
                user : {
                    id : user.id
                }
            }
            jwt.sign(payload,
                config.jwtSecret,
                {expiresIn:3600},
                (err,token)=>{
                    if(err) return res.status(500).json({message:'Server error'})
                    return res.json({token})
                }
            )
        })
    } catch (error) {
        
    }
}

exports.getBusinessAuth = (req,res) => {
    const id = req.user.id
    CsmBusiness.findById(id,(err,data)=>{
        if(err) return res.status(500).json({message:err.message})
        return res.json(data[0])
    })
    
}

exports.getUserAuth = (req,res) => {
    const id = req.user.id
    console.log(id)
    CsmUser.findById({id},(err,data)=>{
        if(err){console.log(err); return res.status(500).json({message:err.message})}
        console.log(data)
        return res.json(data[0])
    })
}