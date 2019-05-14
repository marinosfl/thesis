const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .min(8)
      .required()
      .label('Password')
  });
