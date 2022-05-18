const Joi = require('joi');

const UsersPayloadSchema = Joi.object({
    username: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string(),
});

module.exports = { UsersPayloadSchema };
