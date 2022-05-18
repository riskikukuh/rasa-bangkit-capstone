const routes = (handler) => [
    {
        method: 'POST',
        path: '/register',
        handler: handler.newUsersHandler,
        options: {
            payload: {
                multipart: true
            }
        },
    },
];

module.exports = routes;
