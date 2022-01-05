const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const businessAuth = require('../../middleware/business-auth')

const AuthController = require('./../controllers/auth.controller')

router.post('/login',AuthController.login)
router.post('/login-business',AuthController.loginBusiness)

router.get('/user-auth',auth,AuthController.getUserAuth)
router.get('/business-auth',businessAuth,AuthController.getBusinessAuth)

module.exports = router