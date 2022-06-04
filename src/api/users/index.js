const routes = require('./routes');
const UsersHandler = require('./handler');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { userService, validator, tokenManager, historyService, foodService }) => {
    const usersHandler = new UsersHandler(userService, validator, tokenManager, historyService, foodService);
    server.route(routes(usersHandler));
  },
};
