"use_strict";

const Constant = Object.freeze({
  FLUTTER_PUBSPEC: "pubspec.yaml",
  ASSETS_CONFIG_FILE: "assets_config.json"
});

class AssetsCLIApp {
  extractCLIArguments() {
    const args = process.argv.slice(2, process.argv.length);
    if (args.length === 0) {
      throw new Error("must have entry point!");
    }

    const flutterRootPath = args[0];
    const yamlFilePath = `${flutterRootPath}/${Constant.FLUTTER_PUBSPEC}`;
    const fs = require("fs");
    if (!fs.existsSync(yamlFilePath)) {
      throw new Error("root path must have an pubspec.yaml file");
    }

    return {
      root: flutterRootPath
    };
  }

  extraConfigFileContent() {
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
    return {
      assets: assets,
      code: code,
      pubspec: Constant.FLUTTER_PUBSPEC
    };
  }

  async run() {
    const cliArgs = this.extractCLIArguments();
    /// 当前文件夹设置为 root 位置
    const process = require("process");
    process.chdir(cliArgs.root);
    /// 提取配置文件
    const configs = this.extraConfigFileContent();
    const FolderWatcher = require("./assets/folder_watcher.js");
    new FolderWatcher(configs).run();
  }
}

try {
  new AssetsCLIApp().run();
} catch (error) {
  console.log(`run assets failed: ${error}!`);
}
