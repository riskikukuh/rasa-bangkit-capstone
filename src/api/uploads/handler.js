class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    const status = 'obtained';
    const foodId = 'food-123123';
    const userId = 'user-tJzCzhjIfSDPpWco';
    await this._validator.validateImageHeaders(data.hapi.headers);
    const filename = await this._service.writeFile(data, data.hapi);
    const history = await this._service.addHistory(filename, userId, foodId, status);
    return h.response({
      status: 'success',
      message: 'Gambar berhasil diunggah',
      data: {
        pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
        historyId: history,
      },
    }).code(201);
  }
}

module.exports = UploadsHandler;
