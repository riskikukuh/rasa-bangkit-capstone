const Joi = require('joi');

const PostImageHeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/jpeg', 'image/jpg', 'image/png',).required(),
}).unknown();

const UploadPayloadSchema = Joi.object({
  data: Joi.any()
    .meta({ swaggerType: 'file' }).required()
    .description('Image for analyze')
});

const AuthorizationSchema = Joi.object({
  'authorization': Joi.string().optional().description('User access token. Format \'Bearer [token]\''),
}).unknown();

module.exports = {
  PostImageHeaderSchema,
  UploadPayloadSchema,
  AuthorizationSchema,
};
