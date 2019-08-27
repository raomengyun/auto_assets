const UI = require("../ui/ui.js");

class PubspecGen {
  constructor(pubspecPath, infos) {
    this.pubspecPath = pubspecPath;
    this.infos = infos;
  }

  gen() {
    const yaml = require("js-yaml");
    const fs = require("fs");
    try {
      const doc = yaml.safeLoad(fs.readFileSync(this.pubspecPath));
      const assets = this.infos.map(i => i.tag);
      doc.flutter.assets = assets;
      const string = yaml.safeDump(doc);
      fs.writeFileSync(this.pubspecPath, string);

      UI.verbose(`assets declaration: ${JSON.stringify(assets)}`, 2);
    } catch (error) {
      UI.error(`gen pubspec code error: ${error}`);
    }
  }
}

module.exports = PubspecGen;
