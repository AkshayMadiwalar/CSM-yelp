const express = require('express')
const cors = require('cors')
const app = express()

//consume kafka messages
require('./kafka/consume')

app.use(cors())

//Init Middleware
app.use(express.json({extended: false}))

app.use('/orders',require('./src/routes/orders.routes'))
app.use('/reviews',require('./src/routes/reviews.routes'))

const PORT = process.env.PORT || 5001

app.listen(PORT,(req,res)=>{

})