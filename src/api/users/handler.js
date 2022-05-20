class UsersHandler {
    constructor(service, validator, tokenManager) {
        this._service = service;
        this._validator = validator;
        this._tokenManager = tokenManager;

        this.newUsersHandler = this.newUsersHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    async newUsersHandler(request, h) {
        await this._validator.validateUsersPayload(request.payload);
        const {
            username,
            password,
            email,
            firstname,
            lastname,
        } = request.payload;
        const userId = await this._service.addUsers(username, password, email, firstname, lastname);
        return h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId,
            },
        }).code(201);
    }

    async loginHandler(request, h) {
        await this._validator.validateLoginPayload(request.payload);
        const {
            username,
            password,
        } = request.payload;
        const id = await this._service.verifyUserCredentials(username, password);
        const accessToken = await this._tokenManager.generateAccessToken({ id });
        return h.response({
            status: 'success',
            message: 'Login berhasil',
            data: {
                accessToken,
            },
        }).code(200);
    }
}

module.exports = UsersHandler;
