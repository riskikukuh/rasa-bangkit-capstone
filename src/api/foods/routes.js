const routes = (handler) => [
    {
        method: 'GET',
        path: '/foods',
        handler: handler.getFoodsHandler,
    }, {
        method: 'GET',
        path: '/foods/{id}',
        handler: handler.getFoodByIdHandler,
    }
];

module.exports = routes;
