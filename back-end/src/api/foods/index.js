const routes = require('./routes');
const FoodsHandler = require('./handler');

module.exports = {
  name: 'foods',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const foodsHandler = new FoodsHandler(service, validator);
    server.route(routes(foodsHandler));
  },
};
