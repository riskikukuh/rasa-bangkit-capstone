const GuestUtil = require('../../utils/GuestUtil');
const { mapFoodToSimpleFood } = require('../../utils/FoodUtil');

class HistoryHandler {
    constructor(historyService, foodService) {
        this._historyService = historyService;
        this._foodService = foodService;
        
        this.getHistoryHandler = this.getHistoryHandler.bind(this);
    }

    async getHistoryHandler(request, h) {
        const { id: userId } = request.auth.credentials;
        const userHistory = await this._historyService.getHistoryByUserId(userId);

        const history = [];

        for (const single of userHistory) {
            const food = mapFoodToSimpleFood(await this._foodService.getFoodById(single.food_id));
            history.push({
                ...single,
                food,
            });
        }
        
        return h.response({
            status: 'success',
            data: {
                history,
            },
        });
    }
}

module.exports = HistoryHandler;
