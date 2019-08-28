const Constant = Object.freeze({
  FLUTTER_PUBSPEC: "pubspec.yaml",
  ASSETS_CONFIG_FILE: "assets_config.json"
});

class AutoAssets {
  constructor(root) {
    this.root = root;
  }

  stop() {
    this.folderWatcher.stop();
  }

  start() {
    /// 当前文件夹设置为 root 位置
    const process = require("process");
    process.chdir(this.root);
    /// 校验是否是 flutter 项目
    this._validateFlutterProject();
    /// 提取配置文件
    const configs = this._extraConfigFileContent();
    const FolderWatcher = require("./folder_watcher.js");
    this.folderWatcher = new FolderWatcher(configs);
    this.folderWatcher.start();
  }

  _validateFlutterProject() {
    const yamlFilePath = `${this.root}/${Constant.FLUTTER_PUBSPEC}`;
    const fs = require("fs");
    if (!fs.existsSync(yamlFilePath)) {
      throw new Error("root path must have an pubspec.yaml file");
    }
    /// verbose flag
    const flags = process.argv.slice(3, process.argv.length);
    const verbose = flags.includes("-v");

    return {
      root: this.root,
      verbose: verbose
    };
  }

  _extraConfigFileContent() {
    const configFilePath = Constant.ASSETS_CONFIG_FILE;
    const fs = require("fs");
    if (!fs.existsSync(configFilePath)) {
      throw new Error("root path must have an assets_config.json file");
    }

    const content = JSON.parse(fs.readFileSync(configFilePath)) || {};
    const assets = content.assets;
    const code = content.code || "lib/assets/assets.dart";
    if (!assets) {
      throw new Error(
        "assets_config.json file must specify `assets` folder as assets"
      );
    }

    const { trimEnd } = require("lodash/string");
    return {
      assets: trimEnd(assets, "/"),
      code: trimEnd(code, "/"),
      pubspec: Constant.FLUTTER_PUBSPEC
    };
  }
}

module.exports = AutoAssets;
