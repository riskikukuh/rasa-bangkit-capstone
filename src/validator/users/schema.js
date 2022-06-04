const Joi = require('joi');

const UsersPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string(),
}).required();

const LoginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const AuthTokenValidator = Joi.object({
  accessToken: [
    Joi.string().required(),
    Joi.number(),
  ],
});

module.exports = {
  UsersPayloadSchema,
  LoginValidator,
  AuthTokenValidator,
};
