const express = require('express')
const router = express.Router()

const auth = require('./../../middleware/auth')

const OrderController = require('./../controller/orders.controller')

router.post('/myorders',auth,OrderController.findOrderByCustomerId)

// router.post('/restuarnt-orders',busines)

router.post('/updateOrderStatus',auth,OrderController.updateOrderStatus)

module.exports = router