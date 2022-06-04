const Joi = require("joi");
const SwaggerUtil = require("../../utils/SwaggerUtil");
const { UsersPayloadSchema, LoginValidator } = require("../../validator/users/schema");

const routes = (handler) => [
  {
    method: 'POST',
    path: '/user',
    handler: handler.newUsersHandler,
    options: {
      payload: {
        multipart: true,
      },
      description: 'Create user',
      notes: 'Everyone can register as a user',
      tags: ['api'],
      validate: {
        payload: UsersPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: {
            201: {
              description: 'User created',
              schema: SwaggerUtil.baseResponse(Joi.object({
                userId: Joi.string(),
              })),
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
    method: 'POST',
    path: '/user/login',
    handler: handler.loginHandler,
    options: {
      payload: {
        multipart: true,
      },
      description: 'Login user into system',
      tags: ['api'],
      validate: {
        payload: LoginValidator,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: {
            200: {
              description: 'Login success',
              schema: SwaggerUtil.baseResponse(Joi.object({
                accessToken: Joi.string(),
              })),
            },
            400: {
              description: 'Bad request with error message',
              schema: SwaggerUtil.infoResponse(),
            },
            401: {
              description: 'Username or password does not match',
              schema: SwaggerUtil.infoResponse()
            },
          },
        },
      },
    },
  }, {
    path: '/user/history',
    method: 'GET',
    handler: handler.getHistoryHandler,
    options: {
      auth: 'rasa_jwt',
      description: 'User history of analyzing image',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          'authorization': Joi.string().required().description('User access token. Format \'Barear [token]\''),
        }).unknown(),
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: {
            200: {
              description: 'Success get history',
              schema: SwaggerUtil.baseResponse(SwaggerUtil.makeArray(SwaggerUtil.historyResponse())),
            },
            401: {
              description: 'Invalid token signature',
              schema: SwaggerUtil.tokenInvalidResponse(),
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
