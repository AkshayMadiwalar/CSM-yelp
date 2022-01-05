const mysql = require('mysql')

const db = mysql.createPool({
    host:"csm.chdckafyrses.ap-south-1.rds.amazonaws.com",
    user:"admin",
    password:"akshay1998",
    database:"csm"
})

module.exports = db