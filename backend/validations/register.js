const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.first_name) ? data.first_name : ''
  data.lastname = !isEmpty(data.last_name) ? data.last_name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password_confirm = !isEmpty(data.password) ? data.password : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'Firstname field is required'
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Lastname field is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Password confirm field is required'
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Passwords must match'
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone number field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
