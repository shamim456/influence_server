// external import
const express = require('express');
const router = express.Router()

// internal import
const { getHome } = require('../handler/homeHandler')


router.get('/', getHome)



module.exports = router
