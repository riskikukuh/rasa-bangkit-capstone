const Joi = require('joi');
const path = require('path');
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
        maxBytes: 500000,
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
                status: SwaggerUtil.analyzeResultStatus(),
              }).label('Analyze Result'), message = Joi.string()),
            },
            400: {
              description: 'Bad request with error message',
              schema: SwaggerUtil.infoResponse(),
            },
          },
        },
      },
    },
  }, {
    path: '/upload/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
