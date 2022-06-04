const Joi = require('joi');
const SwaggerUtil = require('../../utils/SwaggerUtil');
const { FoodsIdParamsSchema } = require('../../validator/foods/schema');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/foods',
    handler: handler.getFoodsHandler,
    options: {
      description: 'Get list food',
      notes: 'Returns a list of food',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success list food data',
              schema: SwaggerUtil.baseResponse(SwaggerUtil.makeArray(SwaggerUtil.foodResponse()),),
            }
          },
        },
      },
    },
  }, {
    method: 'GET',
    path: '/foods/{id}',
    handler: handler.getFoodByIdHandler,
    options: {
      description: 'Get food by id',
      notes: 'Returns a food item by the id passed in the path',
      tags: ['api'],
      validate: {
        params: FoodsIdParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success return food data',
              schema: SwaggerUtil.baseResponse(SwaggerUtil.foodResponse()).keys({
                data: SwaggerUtil.foodResponse(),
              }),
            },
            400: {
              description: 'Bad request with error message',
              schema: SwaggerUtil.infoResponse(),
            },
            404: {
              description: 'Food data not found',
              schema: SwaggerUtil.infoResponse(),
            }
          },
        },
      }
    },
  },
];

module.exports = routes;
