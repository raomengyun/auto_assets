const UI = require("../ui/ui.js");

class CodeGen {
  constructor(codePath, identifiers) {
    this.identifiers = identifiers;
    this.codePath = codePath;
  }

  gen() {
    UI.step("gen dart code", 2);

    const Node = require("./node.js");
    const contents = this.identifiers
      .map(iden => new Node(iden).gen())
      .join("\n");

    const fs = require("fs");
    const p = require("path");
    const folder = p.dirname(this.codePath);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    fs.writeFileSync(this.codePath, this.genAssetImages(contents));
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
