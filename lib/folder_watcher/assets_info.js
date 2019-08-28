const UI = require("../ui/ui.js");

class AssetsInfo {
  constructor(path, assets_root) {
    this.path = path;
    this.assets_root = assets_root.find(a => path.startsWith(a));

    this._resolutionRgx = /^[\d]+(\.[\d]+)?x$/;
  }

  resolve() {
    if (!this._validPath(this.path)) {
      throw new Error(`Invalid Path: ${this.path}`);
    }
    /// 有效的路径
    const p = require("path");
    const ext = p.extname(this.path);
    const relativePath = p.relative(this.assets_root, this.path);
    const relativeName = this._fileNameWithoutExt(relativePath, ext);
    const split = this._splitPath(relativeName);
    const paths = split.paths;

    const { capitalize } = require("lodash/string");
    const { flatMap } = require("lodash/collection");
    /// 先约定命名为 snake_case
    const identifier = flatMap(paths, p => p.split("_"))
      .map((w, index) => {
        if (index != 0) {
          return capitalize(w);
        } else {
          return w.toLowerCase();
        }
      })
      .join("");

    const result = {
      ...split,
      ext: ext,
      identifier: identifier,
      folder: this.assets_root
    };

    UI.verbose(`asset info: ${JSON.stringify(result)}`, 2);

    return result;
  }

  /// 分割path
  _splitPath(path) {
    const paths = path.split("/");
    const resolution = paths[paths.length - 2];
    if (resolution && resolution.match(this._resolutionRgx)) {
      paths.splice(paths.length - 2, 1);
      return {
        resolution: resolution,
        path: path,
        paths: paths
      };
    }

    return {
      path: path,
      paths: paths
    };
  }

  /// 除去后缀的文件名
  _fileNameWithoutExt(path, ext) {
    return path
      .split(".")
      .slice(0, -1)
      .join(".");
  }

  /// 是否是有效的路径
  _validPath(path) {
    return path.match(/^[\/a-z0-9_\.]*(\.[a-z0-9]+)?$/);
  }
}

module.exports = AssetsInfo;
