const AnalyzeResultStatus = require("../../utils/AnalyzeResultStatus");
const GuestUtil = require("../../utils/GuestUtil");

class UploadsHandler {
  constructor(historyService, storageService, uploadValidator, userValidator, tokenManager) {
    this._historyService = historyService;
    this._storageService = storageService;
    this._uploadValidator = uploadValidator;
    this._userValidator = userValidator;
    this._tokenManager = tokenManager;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const status = AnalyzeResultStatus.obtained;
    const foodId = GuestUtil.guest().food_id;
    let userId = GuestUtil.guest().id;

    if (request.headers.authorization) {
      const accessToken = await request.headers.authorization.trim().split(' ')[1];
      await this._userValidator.validateAuthToken({ accessToken });
      const { id } = await this._tokenManager.verifyAccessToken(accessToken);
      userId = id;
    }

    await this._uploadValidator.validateImageHeaders(request.payload.data.hapi.headers);
    await this._uploadValidator.validatePayloadImage(request.payload);
    const { data } = request.payload;
    const url = await this._storageService.writeFile(data, data.hapi);
    const analyzeId = await this._historyService.addHistory(url, userId, foodId, status);
    return h.response({
      status: 'success',
      data: {
        // pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
        pictureUrl: url,
        analyzeId: analyzeId,
        status: status,
      },
    }).code(201);
  }
}

module.exports = UploadsHandler;