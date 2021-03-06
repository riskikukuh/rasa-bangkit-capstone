const routes = require('./routes');
const UploadsHandler = require('./handler');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { storageService, foodService, historyService, uploadValidator, userValidator, tokenManager }) => {
    const uploadsHandler = new UploadsHandler(historyService, foodService, storageService, uploadValidator, userValidator, tokenManager);
    server.route(routes(uploadsHandler));
  },
};
