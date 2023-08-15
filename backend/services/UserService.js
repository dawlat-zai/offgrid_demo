const bcrypt = require('bcryptjs')
const influxDB = require('../config/db')
const { Point } = require('@influxdata/influxdb-client')

require('dotenv').config()

const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG)

const getUserByEmail = async (email) => {
  const fluxQuery =
    'from(bucket:"' +
    process.env.INFLUX_BUCKET +
    '") |> range(start: 0) |> filter(fn: (r) => r._measurement == "user" and r.email == "' +
    email +
    '")'

  const result = await queryApi.collectRows(fluxQuery)

  let user = null
  if (result.length > 0) {
    user = {
      first_name: result[0].first_name,
      last_name: result[0].last_name,
      email: result[0].email,
      password: result[0].password,
      phone: result[0]._value
    }
  }

  return user
}

const createUser = async (user) => {
  user.password = await hashString(user.password)

  const point = new Point('user')
    .tag('first_name', user.first_name)
    .tag('last_name', user.last_name)
    .tag('email', user.email)
    .tag('password', user.password)
    .stringField('phone', user.phone)

  const writeApi = influxDB.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET)

  writeApi.writePoint(point)

  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })

  return getUserByEmail(user.email)
}

const comparePasswordHash = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword)
}

const hashString = async (string) => {
  const salt = await generateSalt()

  return await bcrypt.hash(string, salt)
}

const generateSalt = async () => {
  return await bcrypt.genSalt()
}

module.exports = {
  getUserByEmail,
  comparePasswordHash,
  createUser
}
