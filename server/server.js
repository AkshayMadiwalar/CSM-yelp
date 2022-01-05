const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

//Init Middleware
app.use(express.json({extended: false}))

//app.use('/auth',require('./routes/auth'))
app.use('/users',require('./src/routes/user.routes'))
app.use('/auth',require('./src/routes/auth.routes'))
app.use('/poi/resto',require('./src/routes/resto.routes'))
app.use('/poi/resto/menu',require('./src/routes/menu.routes'))
app.use('/poi/askcommunity',require('./src/routes/askcommunity.routes'))
app.use('/cart',require('./src/routes/cart.routes'))

const PORT = 8585

app.listen(PORT,(req,res)=>{
    console.log("Node Server running on",PORT)
    const sql = "select * from csm_user"
})

app.get("/test",(req,res)=>{
    res.send("Node server running")
})