class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    await this._validator.validateImageHeaders(data.hapi.headers);
    const filename = await this._service.writeFile(data, data.hapi);
    return h.response({
      status: 'success',
      message: 'Gambar berhasil diunggah',
      data: {
        pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      },
    }).code(201);
  }
}

module.exports = UploadsHandler;
