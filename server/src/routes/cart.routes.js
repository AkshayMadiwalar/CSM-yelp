const express = require('express')
const router = express.Router()
const buisnessAuth = require('./../../middleware/business-auth')
const auth =require('./../../middleware/auth')

const CartController = require('./../controllers/cart.controller')

router.post('/placeorder',auth,CartController.placeorder)

module.exports = router