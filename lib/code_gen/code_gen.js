const UI = require("../ui/ui.js");

class CodeGen {
  constructor(codeFolder, infos) {
    this.infos = infos;
    this.codeFolder = codeFolder;

    /// create folder if needed
    const fs = require("fs");
    if (!fs.existsSync(this.codeFolder)) {
      fs.mkdirSync(this.codeFolder);
    }
  }

  gen() {
    UI.verbose("gen dart code", 2);

    const fs = require("fs");
    const CodeTemplate = require("./code_template.js");
    const support = require("../support/support.js");
    /// Asset 声明节点，类型都是字符串
    const assetsCode = new CodeTemplate(
      "assets_template",
      support.all(),
      "asset",
      this.infos
    ).gen();
    fs.writeFileSync(`${this.codeFolder}/assets.dart`, assetsCode);
    /// Assets_Image 节点
    const assetImagesCode = new CodeTemplate(
      "images_template",
      support.images,
      "image",
      this.infos,
      ["import 'package:flutter/widgets.dart';", `import 'assets.dart';`]
    ).gen();
    fs.writeFileSync(`${this.codeFolder}/assets_images.dart`, assetImagesCode);
    /// 生成 umbrella
    this._genUmbrella();
  }

  /// 生成总览文件
  _genUmbrella() {
    const fs = require("fs");
    const content = [
      "export './assets.dart';",
      "export './assets_images.dart';"
    ].join("\n");
    fs.writeFileSync(`${this.codeFolder}/auto_assets.dart`, content);
  }
}

module.exports = CodeGen;
