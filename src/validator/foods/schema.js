const Joi = require('joi');

const FoodsIdParamsSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  FoodsIdParamsSchema,
};
