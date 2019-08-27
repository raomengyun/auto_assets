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
    /// flutter project path
    const flutterRootPath = args[0];
    const yamlFilePath = `${flutterRootPath}/${Constant.FLUTTER_PUBSPEC}`;
    const fs = require("fs");
    if (!fs.existsSync(yamlFilePath)) {
      throw new Error("root path must have an pubspec.yaml file");
    }
    /// verbose flag
    const flags = process.argv.slice(3, process.argv.length);
    const verbose = flags.includes("-v");

    return {
      root: flutterRootPath,
      verbose: verbose
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

    const { trimEnd } = require("lodash/string");
    return {
      assets: trimEnd(assets, "/"),
      code: trimEnd(code, "/"),
      pubspec: Constant.FLUTTER_PUBSPEC
    };
  }

  run() {
    const cliArgs = this.extractCLIArguments();
    require("./ui/ui.js").isVerbose = cliArgs.verbose;
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
