const UI = require("../ui/ui.js");

class CodeGen {
  constructor(identifiers, path) {
    this.identifiers = identifiers;
    this.path = path;
  }

  gen() {
    const Node = require("./node.js");
    const contents = this.identifiers
      .map(iden => new Node(iden).gen())
      .join("\n");

    const fs = require("fs");
    fs.writeFileSync("debug/debug.dart", this.genAssetImages(contents));
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
