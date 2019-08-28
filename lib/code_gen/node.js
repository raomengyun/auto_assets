class Node {
  constructor(infos) {
    this.identifier = infos.identifier;
    this.ext = infos.ext;
    this.varients = infos.varients;
    this.tag = infos.tag;
  }

  gen() {
    return "";
  }

  static type(type, infos) {
    switch (type) {
      case "asset":
        return new AssetNode(infos);
      case "image":
        return new ImageNode(infos);
    }
  }
}

/// Asset 名称节点
class AssetNode extends Node {
  gen() {
    return `
  /// Assets for ${this.identifier}
  /// ${this.varients.join(", ")}
  static const String ${this.identifier} = "${this.tag}";`;
  }
}

/// 图片资源节点
class ImageNode extends Node {
  gen() {
    return `
  /// Assets for ${this.identifier}
  /// ${this.varients.join(", ")}
  static AssetImage get ${this.identifier} => const AssetImage(Assets.${
      this.identifier
    });`;
  }
}

module.exports = Node;
