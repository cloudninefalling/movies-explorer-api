const { celebrate, Joi } = require('celebrate');

module.exports.validatePatchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
