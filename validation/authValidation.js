const Validator = require('validator');
const validText = require('./validText');

module.exports = function validateUserAuth(username, password, type) {
  let errors = {};

  username = validText(username) ? username : '';
  password = validText(password) ? password : '';

  if (Validator.isEmpty(username)) {
    errors.username = 'username field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (type === 'register') {
    if (!Validator.isLength(username, { min: 3, max: 30 })) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
