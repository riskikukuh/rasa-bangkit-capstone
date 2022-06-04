const InvariantError = require('../../api/exceptions/InvariantError');
const {
  UsersPayloadSchema,
  LoginValidator,
  AuthTokenValidator,
} = require('./schema');

const UsersValidator = {
  validateUsersPayload: (payload) => {
    const validationResult = UsersPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateLoginPayload: (payload) => {
    const validationResult = LoginValidator.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateAuthToken: (headers) => {
    const validationResult = AuthTokenValidator.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = UsersValidator;
