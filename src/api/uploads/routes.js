const path = require('path');

const routes = (handler) => [
  {
    path: '/upload/pictures',
    method: 'POST',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
    },
  }, {
    path: '/upload/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
