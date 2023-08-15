const { InfluxDB } = require('@influxdata/influxdb-client')

require('dotenv').config()

const url = process.env.INFLUX_URL
const token = process.env.INFLUX_TOKEN

const influxDB = new InfluxDB({ url, token })

module.exports = influxDB
