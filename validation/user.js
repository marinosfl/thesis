const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  email: Joi.string()
    .email()
    .min(20)
    .required()
    .label('Email'),
  password: Joi.string()
    .min(8)
    .max(10)
    .required()
    .label('Password')
});
