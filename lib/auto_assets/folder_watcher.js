const UI = require("../ui/ui.js");

class FolderWacther {
  constructor(config) {
    this.config = config;
    this.infos = {};

    this.run = this.run.bind(this);
    this._addFile = this._addFile.bind(this);
    this._removeFile = this._removeFile.bind(this);
    this._changeFile = this._changeFile.bind(this);
    this._unifyInfos = this._unifyInfos.bind(this);
    this._resolvePath = this._resolvePath.bind(this);
    this._reGenerate = this._reGenerate.bind(this);
    this._supportedFile = this._supportedFile.bind(this);
    this._compressAssets = this._compressAssets.bind(this);
  }

  run() {
    const chokidar = require("chokidar");
    chokidar
      .watch(this.config.assets, { ignored: /(^|[\/\\])\..*$/ })
      .on("add", this._addFile);

    chokidar
      .watch(this.config.assets, { ignored: /(^|[\/\\])\..*$/ })
      .on("unlink", this._removeFile);

    chokidar
      .watch(this.config.assets, { ignored: /(^|[\/\\])\..*$/ })
      .on("change", this._changeFile);
  }

  _addFile(path) {
    if (!this._supportedFile(path)) {
      return;
    }

    UI.step(`Add: ${path}`);

    if (!this.infos[path]) {
      this._resolvePath(path);
      this._compressAssets(path);
      this._reGenerate();
    }
  }

  _changeFile(path) {
    if (!this._supportedFile(path)) {
      return;
    }

    UI.step(`Change: ${path}`);
    this._compressAssets(path);
  }

  _removeFile(path) {
    if (!this._supportedFile(path)) {
      return;
    }

    UI.step(`Remove: ${path}`);

    if (this.infos[path]) {
      delete this.infos[path];
      this._reGenerate();
    }
  }

  /// 重新生成 Dart 代码以及 pubspec 声明
  _reGenerate() {
    UI.step("unify infos", 1);
    const infos = this._unifyInfos();
    UI.verbose(JSON.stringify(infos), 2);

    UI.step("regenerate dart code", 1);
    const CodeGen = require("../code_gen/code_gen.js");
    new CodeGen(this.config.code, infos).gen();

    UI.step("regenerate pubspec.yaml assets", 1);
    const PubspecGen = require("../pubspec/pubspec_gen.js");
    new PubspecGen(this.config.pubspec, infos).gen();
  }

  _unifyInfos() {
    /// 重新构造 infos
    const uniqueInfos = {};
    Object.values(this.infos).forEach(info => {
      if (!uniqueInfos[info.identifier]) {
        uniqueInfos[info.identifier] = {
          varients: [info.path],
          ext: info.ext,
          identifier: info.identifier,
          tag: `${this.config.assets}/${info.paths.join("/")}${info.ext}`
        };
      } else {
        const varients = uniqueInfos[info.identifier].varients;
        varients.push(info.path);
        const varientExt = uniqueInfos[info.identifier].ext;
        if (varientExt !== info.ext) {
          UI.warning(
            `Varients with different extension: ${JSON.stringify(varients)}`,
            2
          );
        }
      }
    });
    return Object.values(uniqueInfos).sort((a, b) => {
      return a.identifier > b.identifier ? 1 : -1;
    });
  }

  /// 获取资源的信息
  _resolvePath(path) {
    try {
      UI.step("get asset info", 1);
      const AssetsInfo = require("./assets_info.js");
      this.infos[path] = new AssetsInfo(path, this.config.assets).resolve();
    } catch (error) {
      UI.warning(`Invalid Path: ${error.message}`, 2);
    }
  }

  /// 压缩资源
  _compressAssets(path) {
    UI.step("optimize image", 1);
    const ImageOpt = require("../image_opt/image_opt.js");
    new ImageOpt(path).opt();
  }

  /// 支持的后缀
  _supportedFile(path) {
    const p = require("path");
    const { all } = require("../support/support.js");
    return all().includes(p.extname(path));
  }
}

module.exports = FolderWacther;
