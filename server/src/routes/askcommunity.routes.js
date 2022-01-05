const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

const AskCommunityController = require('../controllers/askcommunity.controller')

router.post('/ask-question',auth,AskCommunityController.newQuestion)

module.exports = router