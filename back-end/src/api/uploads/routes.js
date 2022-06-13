const Joi = require('joi');
const SwaggerUtil = require('../../utils/SwaggerUtil');
const { UploadPayloadSchema, AuthorizationSchema, } = require('../../validator/uploads/schema');

const routes = (handler) => [
  {
    path: '/analyze',
    method: 'POST',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 7000000,
      },
      description: 'Analyze food name by image',
      tags: ['api'],
      validate: {
        payload: UploadPayloadSchema,
        headers: AuthorizationSchema,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: {
            201: {
              description: 'Analyze success',
              schema: SwaggerUtil.baseResponse(Joi.object({
                pictureUrl: Joi.string(),
                analyzeId: Joi.string(),
                foodId: Joi.string(),
                accuracy: Joi.number(),
                status: SwaggerUtil.analyzeResultStatus(),
              }).label('Analyze Result'), message = Joi.string()),
            },
            412: {
              description: 'Image size too large',
              schema: Joi.object({
                statusCode: Joi.number(),
                error: Joi.string(),
                message: Joi.string(),
              }).label('ImageSizeError'),
            },
            400: {
              description: 'Bad request with error message',
              schema: SwaggerUtil.infoResponse(),
            },
          },
        },
      },
    },
  }
];

module.exports = routes;
