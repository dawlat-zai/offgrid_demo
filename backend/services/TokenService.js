const jwt = require('jsonwebtoken')

const createJWTToken = async (user) => {
  const payload = user

  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '2h'
  })
}

module.exports = {
  createJWTToken
}
