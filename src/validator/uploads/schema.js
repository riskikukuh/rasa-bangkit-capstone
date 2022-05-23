const Joi = require('joi');

const PostImageHeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required(),
}).unknown();

module.exports = {
  PostImageHeaderSchema,
};
