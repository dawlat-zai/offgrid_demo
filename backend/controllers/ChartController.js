const ChartService = require('../services/ChartService')

const solar = async (req, res) => {
  const lineBarData = await ChartService.getSolarChartData()
  return res.status(200).json(lineBarData)
}

const battery = async (req, res) => {
  const lineBarData = await ChartService.getBatteryChartData()
  return res.status(200).json(lineBarData)
}

const load = async (req, res) => {
  const lineBarData = await ChartService.getLoadChartData()
  return res.status(200).json(lineBarData)
}

module.exports = {
  solar,
  battery,
  load
}
