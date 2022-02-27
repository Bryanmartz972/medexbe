const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().min(5).required().trim(),
  recoveryQuestion: Joi.string().min(5).max(50).required().trim(),
  recoveryAnswer: Joi.string().max(50).required().trim()
})

module.exports = { authSchema };