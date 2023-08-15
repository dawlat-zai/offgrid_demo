const express = require('express')
const router = express.Router()
const ChartController = require('../controllers/ChartController')

router.post('/charts/solar', ChartController.solar)
router.post('/charts/battery', ChartController.battery)
router.post('/charts/load', ChartController.load)

module.exports = router
