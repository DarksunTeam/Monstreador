const path = window.require('path');
const fs = window.require('fs');

class FileController {
  constructor() {
    this.folders = ['Entity1'];
    this.Entity1 = [];

    this.darksunFolder = (window.require("electron").app || window.require("electron").remote.app).getPath('documents') + '/Darksun';

    if (!fs.existsSync(this.darksunFolder)) {
      fs.mkdirSync(this.darksunFolder);
    }

    this.folders.forEach(folder => {
      const folderPath = this.darksunFolder + '/' + folder;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      let files = fs.readdirSync(folderPath);

      files.forEach(file => {
        this[folder].push(parseDataFile(path.join(folderPath, file)));
      });
    });
  }

  get(type, _id) {
    return this[type].find(file => file._id === _id);
  }

  getArray(type) {
    return this[type];
  }

  getNewId(type) {
    if (this[type].length === 0) {
      return 1
    } else {
      return Math.max(...this[type].map(item => item._id)) + 1;
    }
  }

  set(type, _id, attribute, val) {
    const file = this[type].find(file => file._id === _id);
    file[attribute] = val;
    const path = this.darksunFolder + '/' + type + '/' + this.get(type, _id).fileName;
    fs.writeFileSync(path, JSON.stringify(file, null, 2));
  }

  setObject(type, object) {
    const path = this.darksunFolder + '/' + type + '/' + object.fileName;
    fs.writeFileSync(path, JSON.stringify(object, null, 2));
  }

  removeObject(type, fileName) {
    const path = this.darksunFolder + '/' + type + '/' + fileName;
    fs.unlinkSync(path);
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}

module.exports = FileController;