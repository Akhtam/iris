const Validator = require('validator');
const validText = require('./validText');

module.exports = function chatroomValidation(name, description) {
  let errors = {};

  name = validText(name) ? name : '';
  description = validText(description) ? description : '';

  if (Validator.isEmpty(name)) {
    errors.name = 'name field is required';
  }

  if (Validator.isEmpty(description)) {
    errors.description = 'description field is required';
  }

//   if (!Validator.isLength(description, { min: 6, max: 30 })) {
//     errors.description = 'description must be at least 10 characters';
//   }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
