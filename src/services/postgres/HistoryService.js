const {
  nanoid,
} = require('nanoid');

const {
  Pool,
} = require('pg');

class HistoryService {
  constructor() {
    this._pool = new Pool();
  }

  async getHistoryByUserId(userId) {
    const query = {
      text: 'SELECT id, food_id, image, status, created_at FROM history WHERE user_id = $1',
      values: [userId],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async addHistory(filename, userId, foodId, status) {
    const historyId = `analyze-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO history VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [historyId, userId, foodId, filename, status, +new Date()],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount > 0) {
      throw new InvariantError('Gagal menambahkan history');
    }

    return result.rows[0].id;
  }
}

module.exports = HistoryService;
