const UI = require("../ui/ui.js");

class PubspecGen {
  constructor(pubspecPath, identifiers) {
    this.pubspecPath = pubspecPath;
    this.identifiers = identifiers;
  }

  gen() {
    const yaml = require("js-yaml");
    const fs = require("fs");
    try {
      const doc = yaml.safeLoad(fs.readFileSync(this.pubspecPath));
      const assets = this.identifiers.map(i => i.tag);
      doc.flutter.assets = assets;
      const string = yaml.safeDump(doc);
      fs.writeFileSync(this.pubspecPath, string);

      UI.verbose(`assets declration: ${JSON.stringify(assets)}`, 2);
    } catch (error) {
      UI.error(`gen pubspec code error: ${error}`);
    }
  }
}

module.exports = PubspecGen;
