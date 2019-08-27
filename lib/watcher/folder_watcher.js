const ui = require("../ui/ui.js");
require("../utils/utils.js");

class FoldeWacther {
  constructor(folder) {
    this.folder = folder;
    this.childrens = [];

    this.run = this.run.bind(this);
    this._addFile = this._addFile.bind(this);
    this._removeFile = this._removeFile.bind(this);
    this._supportExt = this._supportExt.bind(this);
    this._reGenerate = this._reGenerate.bind(this);
  }

  run() {
    const chokidar = require("chokidar");
    chokidar
      .watch(this.folder, { ignored: /(^|[\/\\])\..*$/ })
      .on("add", this._addFile);

    chokidar
      .watch(this.folder, { ignored: /(^|[\/\\])\..*$/ })
      .on("unlink", this._removeFile);
  }

  _addFile(path, status) {
    const p = require("path");
    if (!this._supportExt().includes(p.extname(path))) {
      return;
    }

    ui.step(`Add: ${path}`);

    if (!this.childrens.includes(path)) {
      this.childrens.push(path);
      this._reGenerate();
    }
  }

  _removeFile(path, status) {
    const p = require("path");
    if (!this._supportExt().includes(p.extname(path))) {
      return;
    }

    ui.step(`Remove: ${path}`);

    if (!this.childrens.includes(path)) {
      const index = this.childrens.indexOf(path);
      this.childrens.splice(index, 1);
      this._reGenerate();
    }
  }

  _reGenerate() {
    ui.step("_reGenerate", 1);
    this.childrens.forEach(path => {
      const p = require("path");
      const relativePath = p.relative(this.folder, path);
      var paths = relativePath.split("/").flatMap(w => w.split("_"));
      paths = paths.filter(s => !s.match(/^\dx$/));
      ui.step(
        paths
          .map((w, index) => {
            if (index != 0) {
              return w.toCapitalizeCase();
            } else {
              return w.toLowerCase();
            }
          })
          .join(""),
        2
      );
    });
  }

  //   支持的后缀
  _supportExt() {
    return [".jpg", ".png", ".gif", ".svg", ".mp4", ".mp3"];
  }
}

module.exports = FoldeWacther;
