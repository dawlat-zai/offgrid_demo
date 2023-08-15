const validateLoginInput = require('../validations/login')
const validateRegisterInput = require('../validations/register')
const UserService = require('../services/UserService')
const TokenService = require('../services/TokenService')

const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  const user = await UserService.getUserByEmail(email)

  if (!user) {
    return res.status(404).json({ email: 'Email not found' })
  }

  const isPasswordMatched = await UserService.comparePasswordHash(password, user.password)

  if (isPasswordMatched) {
    const token = await TokenService.createJWTToken(user)

    return res.json({
      success: true,
      token: 'Bearer ' + token
    })
  } else {
    return res.status(400).json({ password: 'Password incorrect' })
  }
}

const register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { firstname, lastname, email, password, phone } = req.body

  const user = await UserService.getUserByEmail(email)

  if (user) {
    return res.status(400).json({ email: 'Email already exists' })
  }

  try {
    const newUser = await UserService.createUser({
      firstname,
      lastname,
      email,
      password,
      phone
    })

    return res.json(newUser)
  } catch (error) {
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  login,
  register
}
