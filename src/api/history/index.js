const routes = require('./routes');
const HistoryHandler = require('./handler');

module.exports = {
  name: 'history',
  version: '1.0.0',
  register: async (server, { historyService, foodsService }) => {
    const historyHandler = new HistoryHandler(historyService, foodsService);
    server.route(routes(historyHandler));
  },
};
