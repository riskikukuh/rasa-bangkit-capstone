const path = require('path');

const routes = (handler) => [
  {
    path: '/history',
    method: 'GET',
    handler: handler.getHistoryHandler,
    options: {
        auth: 'rasa_jwt',
    },
  },
];

module.exports = routes;
