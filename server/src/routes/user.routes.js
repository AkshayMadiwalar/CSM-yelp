const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/register',userController.createUser)

router.post('/register-business',userController.registerBusiness)

module.exports = router