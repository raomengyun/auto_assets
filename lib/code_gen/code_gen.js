const UI = require("../ui/ui.js");

class CodeGen {
  constructor(codeFolder, identifiers) {
    this.identifiers = identifiers;
    this.codeFolder = codeFolder;
  }

  gen() {
    UI.verbose("gen dart code", 2);

    const Node = require("./node.js");
    const contents = this.identifiers
      .map(iden => new Node(iden).gen())
      .join("\n");

    const fs = require("fs");
    if (!fs.existsSync(this.codeFolder)) {
      fs.mkdirSync(this.codeFolder);
    }

    const codePath = `${this.codeFolder}/assets.dart`;
    fs.writeFileSync(codePath, this.genAssetImages(contents));
  }

  genAssetImages(content) {
    return `import 'package:flutter/widgets.dart';

class AssetImages {
  AssetImages._();
  ${content}
}`;
  }
}

module.exports = CodeGen;
