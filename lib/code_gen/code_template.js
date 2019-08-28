const UI = require("../ui/ui.js");

class CodeTemplate {
  constructor(templateName, exts, nodeType, infos, imports) {
    this.templateName = templateName;
    this.exts = exts;
    this.nodeType = nodeType;
    this.infos = infos;
    this.imports = imports || [];
  }

  gen() {
    const templatePath = `${__dirname}/code_template/${this.templateName}`;
    const fs = require("fs");
    const templateStr = fs.readFileSync(templatePath, { encoding: "utf8" });

    const filteredIdens = this.infos.filter(i => this.exts.includes(i.ext));
    if (filteredIdens.length === 0) {
      return { code: "", valid: false };
    }
    const contentStr = filteredIdens
      .map(i => this._codeForNode(this.nodeType, i))
      .join("\n");
    const fileContents = templateStr
      .replace("__CODE_TEMPLATE_CONTENTS_REPLACEMENT__", contentStr)
      .replace(
        "__CODE_TEMPLATE_IMPORTS_REPLACEMENT__",
        this.imports.join("\n")
      );
    return { code: fileContents, valid: true };
  }

  _codeForNode(type, identifier) {
    const Node = require("./node.js");
    return Node.type(type, identifier).gen();
  }
}

module.exports = CodeTemplate;
