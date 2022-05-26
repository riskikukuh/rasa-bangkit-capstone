const fs = require('fs');

const {
  nanoid,
} = require('nanoid');

const {
  Pool,
} = require('pg');

const InvariantError = require('../../api/exceptions/InvariantError');

class StorageService {
  constructor(folder) {
    this._pool = new Pool();
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename.split(' ').join('-');
    const path = `${this._folder}/${filename}`;

    const filestream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      filestream.on('error', (error) => reject(error));
      file.pipe(filestream);
      file.on('end', () => resolve(filename));
    });
  }

  async addHistory(filename, userId, foodId, status) {
    const historyId = `history-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO history VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [historyId, userId, foodId, filename, status, +new Date()],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount > 0) {
      throw new InvariantError('History gagal ditambahkan');
    }

    return result.rows[0].id;
    // return historyId;
  }
}

module.exports = StorageService;
