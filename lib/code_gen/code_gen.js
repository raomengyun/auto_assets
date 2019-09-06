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

    const CodeTemplate = require("./code_template.js");
    const support = require("../support/support.js");
    const files = [];
    /// Asset 声明节点，类型都是字符串
    const assets = new CodeTemplate(
      "assets_template",
      support.all,
      "asset",
      this.infos
    ).gen();
    this._syncToFile("assets.dart", assets, files);
    /// Assets_Image 节点
    const assetImages = new CodeTemplate(
      "images_template",
      support.images,
      "image",
      this.infos,
      ["import 'package:flutter/widgets.dart';", `import 'assets.dart';`]
    ).gen();
    this._syncToFile("assets_images.dart", assetImages, files);
    /// 生成 umbrella
    this._genUmbrella(files);
  }

  /// 同步到 Dart 文件
  _syncToFile(named, assets, files) {
    const fs = require("fs");
    if (assets.valid) {
      fs.writeFileSync(`${this.codeFolder}/${named}`, assets.code);
      files.push(named);
    } else {
      if (fs.existsSync(`${this.codeFolder}/${named}`)) {
        fs.unlinkSync(`${this.codeFolder}/${named}`);
      }
    }
  }

  /// 生成总览文件
  _genUmbrella(files) {
    const fs = require("fs");
    const content = files.map(f => `export '${f}';`).join("\n");
    fs.writeFileSync(`${this.codeFolder}/auto_assets.dart`, content);
  }
}

module.exports = CodeGen;
