const AnalyzeResultStatus = require("../../utils/AnalyzeResultStatus");
const { mapFoodToSimpleFood } = require("../../utils/FoodUtil");

class UsersHandler {
  constructor(userService, validator, tokenManager, historyService, foodService) {
    this._userService = userService;
    this._validator = validator;
    this._tokenManager = tokenManager;
    this._historyService = historyService;
    this._foodService = foodService;

    this.newUsersHandler = this.newUsersHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.getHistoryHandler = this.getHistoryHandler.bind(this);
  }

  async newUsersHandler(request, h) {
    await this._validator.validateUsersPayload(request.payload);
    const {
      username,
      password,
      email,
      firstname,
      lastname,
    } = request.payload;
    const userId = await this._userService.addUsers(username, password, email, firstname, lastname);
    return h.response({
      status: 'success',
      data: {
        userId,
      },
    }).code(201);
  }

  async loginHandler(request, h) {
    await this._validator.validateLoginPayload(request.payload);
    const {
      username,
      password,
    } = request.payload;
    const id = await this._userService.verifyUserCredentials(username, password);
    const accessToken = await this._tokenManager.generateAccessToken({ id });
    return h.response({
      status: 'success',
      data: {
        accessToken,
      },
    }).code(200);
  }

  async getHistoryHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const userHistory = await this._historyService.getHistoryByUserId(userId);

    const history = [];

    for (const single of userHistory) {
      const { id, food_id, image, accuracy, status, created_at } = single;
      let food = null;
      if (status == AnalyzeResultStatus.obtained) {
        food = mapFoodToSimpleFood(await this._foodService.getFoodById(food_id));
      }
      history.push({
        id, image, food, accuracy, status, created_at,
      });
    }

    return h.response({
      status: 'success',
      data: history,
    });
  }
}

module.exports = UsersHandler;
