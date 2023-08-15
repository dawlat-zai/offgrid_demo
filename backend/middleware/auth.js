const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(403).send('A token is required for authentication')
  }

  const token = authorization.substring(7)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }

  return next()
}

module.exports = verifyToken
