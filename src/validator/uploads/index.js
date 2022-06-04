const InvariantError = require('../../api/exceptions/InvariantError');
const {
  PostImageHeaderSchema,
  UploadPayloadSchema,
} = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = PostImageHeaderSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePayloadImage: (payload) => {
    const validationResult = UploadPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = UploadsValidator;
