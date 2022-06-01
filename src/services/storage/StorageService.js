const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const stream = require('stream');

class StorageService {
  constructor(folder, cloudStorage) {
    this._folder = folder;
    this._cloudStorage = cloudStorage;
    this._devBucket = 'rasa-test-bucket-1';

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + '-' + meta.filename.split(' ').join('-');

    const bucket = this._cloudStorage.bucket(this._devBucket);
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => reject(error));
      file.pipe(blobStream).on('finish', () => {
        // The file upload is complete
        console.log("######## SELESAI UPLOAD ##########");
        resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      });
    });
  }
}

module.exports = StorageService;
