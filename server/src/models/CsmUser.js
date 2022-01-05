var db = require('../../config/db')
const uuid = require('uuid').v4

exports.findByEmail = (email,result) => {
    const sql = `select * from csm_user where email = '${email}'`
    db.query(sql,(err,res)=>{
        if(err){
            result(err,null);
        }else{
            result(null,res)
        }
    })
}

exports.newUser = ({firstName,lastName,email,encryptedPassword,dob,city,country},result) => {
    const id = uuid()
    console.log(id,typeof(id))
    const sql = `insert into csm_user(id,user_group_id,first_name,last_name,email,password,dob,city,country) values
                    ('${id}',1,'${firstName}','${lastName}','${email}','${encryptedPassword}','${dob}','${city}','${country}')`
    console.log(sql)
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,id)
        }

    })
}

exports.findById = ({id},result) => {
    const sql = `select * from csm_user where id = '${id}'`
    db.query(sql,(err,res)=>{
        if(err) return result(err,null)
        return result(null,res)
    })
}