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

  extraConfigFileContent(root) {
    const configFilePath = `${root}/${Constant.ASSETS_CONFIG_FILE}`;
    const fs = require("fs");
    if (!fs.existsSync(configFilePath)) {
      throw new Error("root path must have an assets_config.json file");
    }

    const content = fs.readFileSync(configFilePath);
    const contentObj = JSON.parse(content) || {};
    const assets = contentObj.assets;
    if (!assets) {
      throw new Error(
        "assets_config.json file must specify `assets` folder as assets"
      );
    }
    return {
      assets: `${root}/${assets}`
    };
  }

  async run() {
    const cliArgs = this.extractCLIArguments();
    const configs = this.extraConfigFileContent(cliArgs.root);
    const FolderWatcher = require("./assets/folder_watcher.js");
    new FolderWatcher(configs.assets).run();
  }
}

try {
  new AssetsCLIApp().run();
} catch (error) {
  console.log(`run assets failed: ${error}!`);
}
