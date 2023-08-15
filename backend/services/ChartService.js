const influxDB = require('../config/db')

require('dotenv').config()

const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG)

const getSolarChartData = async () => {
  const lineBarData = []

  const fluxQuery =
    'from(bucket: "' +
    process.env.INFLUX_BUCKET +
    '") |> range(start: -24h) |> filter(fn: (r) => r["_measurement"] == "solar") |> filter(fn: (r) => r["_field"] == "power") |> aggregateWindow(every: 1h, fn: mean)'

  // TODO error handling
  const data = await queryApi.collectRows(fluxQuery)

  data.forEach((x) => {
    lineBarData.push({ x: x._time, y: x._value })
  })

  return lineBarData
}

const getBatteryChartData = async () => {
  const lineBarData = []

  const fluxQuery =
    'from(bucket: "' +
    process.env.INFLUX_BUCKET +
    '") |> range(start: -24h) |> filter(fn: (r) => r["_measurement"] == "battery") |> filter(fn: (r) => r["_field"] == "voltage") |> aggregateWindow(every: 1h, fn: mean)'

  // TODO error handling
  const data = await queryApi.collectRows(fluxQuery)

  data.forEach((x) => {
    lineBarData.push({ x: x._time, y: x._value })
  })

  return lineBarData
}

const getLoadChartData = async () => {
  const lineBarData = []

  const fluxQuery =
    'from(bucket: "' +
    process.env.INFLUX_BUCKET +
    '") |> range(start: -24h) |> filter(fn: (r) => r["_measurement"] == "load") |> filter(fn: (r) => r["_field"] == "current") |> aggregateWindow(every: 1h, fn: mean)'

  // TODO error handling
  const data = await queryApi.collectRows(fluxQuery)

  data.forEach((x) => {
    lineBarData.push({ x: x._time, y: x._value })
  })

  return lineBarData
}

module.exports = {
  getSolarChartData,
  getBatteryChartData,
  getLoadChartData
}
