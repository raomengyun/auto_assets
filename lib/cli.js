"use_strict";

class AssetsCLIApp {
  extractCLIArguments() {
    const args = process.argv.slice(2, process.argv.length);
    if (args.length === 0) {
      throw new Error(
        "must have entry point! \n Useage: auto_assets [entry point]"
      );
    }
    /// flutter project path
    const flutterRootPath = args[0];
    /// verbose flag
    const flags = process.argv.slice(3, process.argv.length);
    const verbose = flags.includes("-v");

    return {
      root: flutterRootPath,
      verbose: verbose
    };
  }

  run() {
    const cliArgs = this.extractCLIArguments();
    require("./ui/ui.js").isVerbose = cliArgs.verbose;
    const AutoAssets = require("./auto_assets.js");
    new AutoAssets(cliArgs.root).start();
  }
}

try {
  new AssetsCLIApp().run();
} catch (error) {
  console.log(`stack: ${error.stack}!`);
}
