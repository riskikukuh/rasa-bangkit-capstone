const InvariantError = require('../../api/exceptions/InvariantError');
const {
  FoodsIdParamsSchema,
} = require('./schema');

const FoodsValidator = {
  validateIdFoodParams: (params) => {
    const validationResult = FoodsIdParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = FoodsValidator;
