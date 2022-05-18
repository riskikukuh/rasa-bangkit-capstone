class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.newUsersHandler = this.newUsersHandler.bind(this);
    }

    async newUsersHandler(request, h) {
        await this._validator.validateUsersPayload(request.payload);
        const { username, password, email, firstname, lastname } = request.payload;
        const userId = await this._service.addUsers(username, password, email, firstname, lastname);
        return h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId,
            },
        }).code(201);
    }
}

module.exports = UsersHandler;
