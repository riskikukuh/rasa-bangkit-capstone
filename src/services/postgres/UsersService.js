const {
  nanoid,
} = require('nanoid');
const bcrypt = require('bcrypt');
const {
  Pool,
} = require('pg');
const InvariantError = require('../../api/exceptions/InvariantError');
const AuthenticationError = require('../../api/exceptions/AuthenticationError');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async addUsers(username, password, email, firstname, lastname) {
    await this.verifyNewUsername(username);
    await this.verifyNewEmail(email);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, username, hashedPassword, email, firstname, lastname, +new Date()],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount > 0) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
    }
  }

  async verifyUserCredentials(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    const {
      id,
      password: hashedPassword,
    } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    return id;
  }

  async generateToken(userId) {
    const token = nanoid();
    const query = {
      text: 'INSERT INTO tokens VALUES ($1, $2)',
      values: [userId, token],
    };

    await this._pool.query(query);

    return token;
  }
}

module.exports = UserService;
