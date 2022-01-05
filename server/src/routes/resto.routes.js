const express = require('express')
const router = express.Router()
const buisnessAuth = require('./../../middleware/business-auth')
const auth =require('./../../middleware/auth')

const RestoController = require('./../controllers/resto.controller')

router.post('/new-restaurant',buisnessAuth,RestoController.newResto)

router.get('/all',auth,RestoController.allRestaurants)

router.get('/:id',auth,RestoController.findRestaurantById)

router.get('/owner/:ownerId',buisnessAuth,RestoController.findRestaurantByOwnerId)

module.exports = router