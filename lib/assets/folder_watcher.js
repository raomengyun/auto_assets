const UI = require("../ui/ui.js");
require("../utils/utils.js");

class FoldeWacther {
  constructor(config) {
    this.config = config;
    this.infos = {};

    this.run = this.run.bind(this);
    this._addFile = this._addFile.bind(this);
    this._removeFile = this._removeFile.bind(this);
    this._supportExt = this._supportExt.bind(this);
    this._reGenerate = this._reGenerate.bind(this);
  }

  run() {
    const chokidar = require("chokidar");
    chokidar
      .watch(this.config.assets, { ignored: /(^|[\/\\])\..*$/ })
      .on("add", this._addFile);

    chokidar
      .watch(this.config.assets, { ignored: /(^|[\/\\])\..*$/ })
      .on("unlink", this._removeFile);
  }

  _addFile(path) {
    const p = require("path");
    if (!this._supportExt().includes(p.extname(path))) {
      return;
    }

    UI.step(`Add: ${path}`);

    if (!this.infos[path]) {
      this.infos[path] = this._resolvePath(path);
      this._reGenerate();
    }
  }

  _removeFile(path) {
    const p = require("path");
    if (!this._supportExt().includes(p.extname(path))) {
      return;
    }

    UI.step(`Remove: ${path}`);

    if (this.infos[path]) {
      this.infos[path] = undefined;
      this._reGenerate();
    }
  }

  _reGenerate() {
    UI.step("_reGenerate", 1);
    /// 重新构造 identifiers
    const identifiers = {};
    Object.values(this.infos).forEach(info => {
      if (!identifiers[info.identifier]) {
        identifiers[info.identifier] = {
          varients: [info.path],
          ext: info.ext,
          identifier: info.identifier,
          tag: info.paths.join("/")
        };
      } else {
        identifiers[info.identifier].varients.push(info.path);
      }
    });
    const CodeGen = require("../code_gen/code_gen.js");
    new CodeGen(this.config.code, Object.values(identifiers)).gen();

    const PubspecGen = require("../pubspec/pubspec_gen.js");
    new PubspecGen(this.config.pubspec, Object.values(identifiers)).gen();
  }

  _resolvePath(path) {
    const AssetsInfo = require("./assets_info.js");
    return new AssetsInfo(path, this.config.assets).resolve();
  }

  //   支持的后缀
  _supportExt() {
    return [".jpg", ".png", ".gif", ".svg", ".mp4", ".mp3"];
  }
}

module.exports = FoldeWacther;
