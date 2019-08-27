class Node {
  constructor(identifier) {
    this.identifier = identifier;
  }

  gen() {
    const ext = this.identifier.ext;
    if ([".png", ".jpg", ".jpeg"].includes(ext)) {
      return this.genImages();
    }
    return "";
  }

  genImages() {
    return `
  /// Assets for ${this.identifier.identifier}
  /// ${this.identifier.varients.join(", ")}
  static AssetImage _${this.identifier.identifier}() =>
    const AssetImage('${this.identifier.tag}');
  static AssetImage get ${this.identifier.identifier} => _${
      this.identifier.identifier
    }();`;
  }
}

module.exports = Node;
