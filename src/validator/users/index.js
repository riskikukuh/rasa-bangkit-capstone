const InvariantError = require('../../api/exceptions/InvariantError');
const { UsersPayloadSchema } = require('./schema');

const UsersValidator = {
    validateUsersPayload: (payload) => {
        const validationResult = UsersPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = UsersValidator;
