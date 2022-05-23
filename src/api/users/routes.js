const routes = (handler) => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.newUsersHandler,
    options: {
      payload: {
        multipart: true,
      },
    },
  }, {
    method: 'POST',
    path: '/login',
    handler: handler.loginHandler,
    options: {
      payload: {
        multipart: true,
      },
    },
  },
];

module.exports = routes;
