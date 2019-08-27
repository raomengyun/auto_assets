const UI = require("../ui/ui.js");

class PubspecGen {
  constructor(pubspecPath, identifiers) {
    this.pubspecPath = pubspecPath;
    this.identifiers = identifiers;
  }

  gen() {
    UI.step("gen pubspec code", 2);

    const yaml = require("js-yaml");
    const fs = require("fs");
    try {
      const doc = yaml.safeLoad(fs.readFileSync(this.pubspecPath));
      const assets = this.identifiers.map(i => i.tag);
      doc.flutter.assets = assets;
      const string = yaml.safeDump(doc);
      fs.writeFileSync(this.pubspecPath, string);
    } catch (error) {
      UI.step(`gen pubspec code error: ${error}`, 2);
    }
  }
}

module.exports = PubspecGen;
