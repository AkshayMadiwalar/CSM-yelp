const express = require('express')
const router = express.Router()

const businessAuth = require('./../../middleware/business-auth')
const MenuController = require('./../controllers/menu.controller')

router.post('/new-menu-item',businessAuth,MenuController.newMenuItem)

router.get('/resto-menu/:restoId',MenuController.findAllMenuByRestaurantId)

module.exports = router