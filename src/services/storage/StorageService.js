const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const filestream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      filestream.on('error', (error) => reject(error));
      file.pipe(filestream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
