const {
  Pool,
} = require('pg');
const NotFoundError = require('../../api/exceptions/NotFoundError');

class FoodsService {
  constructor() {
    this._pool = new Pool();
  }

  async getFoods() {
    const { rows } = await this._pool.query('SELECT id, name, description, origin, province, image, created_at, updated_at FROM foods WHERE deleted_at is null');
    return rows;
  }

  async getFoodById(foodId) {
    const query = {
      text: 'SELECT id, name, description, origin, province, image, created_at, updated_at FROM foods WHERE id = $1 AND deleted_at is null',
      values: [foodId],
    };

    const resultFoods = await this._pool.query(query);

    if (!resultFoods.rowCount) {
      throw new NotFoundError('Makanan tidak ditemukan');
    }

    return resultFoods.rows[0];
  }

  async getFoodByName(name) {
    const query = {
      text: 'SELECT id FROM foods WHERE name = $1',
      values: [name],
    };

    const resultFoods = await this._pool.query(query);

    if (!resultFoods.rowCount) {
      throw new NotFoundError('Makanan tidak ditemukan');
    }

    return resultFoods.rows[0].id;
  }
}

module.exports = FoodsService;
