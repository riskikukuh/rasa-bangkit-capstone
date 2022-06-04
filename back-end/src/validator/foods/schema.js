const Joi = require('joi');

const FoodsIdParamsSchema = Joi.object({
  id: Joi.string().required().description('The id for the food'),
});

module.exports = {
  FoodsIdParamsSchema,
};
