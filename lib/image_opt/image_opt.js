const UI = require("../ui/ui.js");

class ImageOpt {
  constructor(path) {
    this.path = path;

    this._exts = [".jpeg", ".png", ".jpg", ".svg"];
  }

  opt() {
    const p = require("path");
    if (!this._exts.includes(p.extname(this.path))) {
      return;
    }

    UI.verbose(`optimize image: ${this.path}`, 2);

    const imagemin = require("imagemin");
    const imageminJpegtran = require("imagemin-jpegtran");
    const imageminPngquant = require("imagemin-pngquant");
    const imageminSvgo = require("imagemin-svgo");

    imagemin([this.path], {
      plugins: [imageminJpegtran(), imageminPngquant(), imageminSvgo()]
    }).then(result => {
      const resultData = result[0].data;
      if (!resultData) {
        return;
      }

      const fs = require("fs");
      const originData = fs.readFileSync(this.path);
      if (!resultData.equals(originData)) {
        fs.writeFileSync(this.path, resultData);
      }
    });
  }
}

module.exports = ImageOpt;
