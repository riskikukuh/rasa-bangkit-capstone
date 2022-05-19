class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

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
    const userId = await this._service.verifyUserCredentials(username, password);
    const token = await this._service.generateToken(userId);
    return h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        userId,
      },
    }).code(200);
  }
}

module.exports = UsersHandler;
