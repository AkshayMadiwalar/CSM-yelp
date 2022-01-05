var db = require('../../config/db')
const uuid = require('uuid').v4

exports.findByEmail = (email,result) => {
    const sql = "select * from csm_business where email = " + `'${email}'`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}

exports.findById = (id,result) => {
    const sql = "select * from csm_business where id = " + `'${id}'`
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            return result(err,null)
        } 
        return result(null,res)
    })
}

exports.newBusiness = ({id,firstName,lastName,email,encryptedPassword,businessName,businessCategory,addressLine1,addressLine2,city,country,contactNo},result) => {
    const sql = `insert into csm_business(id,password,business_name,business_category,addressLine1,addressLine2,city,country,first_name,last_name,email,contact_number)
                    values('${id}','${encryptedPassword}','${businessName}','${businessCategory}','${addressLine1}','${addressLine2}','${city}','${country}','${firstName}','${lastName}','${email}','${contactNo}')`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}