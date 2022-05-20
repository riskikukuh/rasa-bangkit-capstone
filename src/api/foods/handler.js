class FoodsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.getFoodsHandler = this.getFoodsHandler.bind(this);
        this.getFoodByIdHandler = this.getFoodByIdHandler.bind(this);
    }

    async getFoodsHandler(request, h) {
        const foods = await this._service.getFoods();
        return h.response({
            status: 'success',
            data: {
                foods,
            },
        });
    }

    async getFoodByIdHandler(request, h) {
        await this._validator.validateIdFoodParams(request.params);
        const { id } = request.params;
        const food = await this._service.getFoodById(id);
        return h.response({
            status: 'success',
            data: {
                food,
            },
        });
    }
}

module.exports = FoodsHandler;
