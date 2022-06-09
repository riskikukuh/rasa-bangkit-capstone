const AnalyzeResultStatus = require("../../utils/AnalyzeResultStatus");
const GuestUtil = require("../../utils/GuestUtil");
const axios = require('axios').default;

class UploadsHandler {
  constructor(historyService, foodService, storageService, uploadValidator, userValidator, tokenManager) {
    this._historyService = historyService;
    this._foodService = foodService;
    this._storageService = storageService;
    this._uploadValidator = uploadValidator;
    this._userValidator = userValidator;
    this._tokenManager = tokenManager;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    let status = AnalyzeResultStatus.obtained;
    let foodId = null;
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
    const url = await this._storageService.writeFile(data, data.hapi).catch(err => {
      return h.response({
        status: 'error',
        message: 'Failed to upload image',
      }).code(500);
    });

    let dataPredictError = null;
    let accuracy = 0.0;

    const resultPredict = await this.rasaPredictImage(url).catch(err => {
      status = AnalyzeResultStatus.error;
      dataPredictError = err.message ? err.message : err.toString();
    });

    if (!dataPredictError) {
      accuracy = resultPredict.accuration;
      foodId = await this._foodService.getFoodByName(resultPredict.prediction);
    }

    const analyzeId = await this._historyService.addHistory(url, userId, foodId, accuracy, status);

    if (dataPredictError) {
      return h.response({
        status: 'success',
        message: dataPredictError,
        data: {
          pictureUrl: url,
          analyzeId,
          foodId,
          accuracy,
          status,
        },
      }).code(201);
    }

    return h.response({
      status: 'success',
      message: null,
      data: {
        pictureUrl: url,
        analyzeId: analyzeId,
        foodId: foodId,
        accuracy,
        status: AnalyzeResultStatus.obtained,
      },
    }).code(201);
  }

  async rasaPredictImage(url) {
    return new Promise(async (resolve, reject) => {
      await axios.post('https://asia-southeast2-rasa-backend-352504.cloudfunctions.net/api-predict-food', {
        url
      })
      .then(function (response) {
        const json = response.data;
        if (json.status == 'success') {
          resolve(json.data);
        } else {
          reject(json.message);
        }
      })
      .catch(function (error) {
        reject(error);
      });
    });
  }
}

module.exports = UploadsHandler;
