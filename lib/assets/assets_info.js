require("../utils/utils.js");

class AssetsInfo {
  constructor(path, assets_root) {
    this.path = path;
    this.assets_root = assets_root;

    this._resolutionRgx = /^\dx$/;
  }

  resolve() {
    const p = require("path");
    const ext = p.extname(this.path);
    const relativePath = p.relative(this.assets_root, this.path);
    const relativeName = this._fileNameWithoutExt(relativePath, ext);
    const split = this._splitPath(relativeName);
    const paths = split.paths;

    /// 先约定命名为 snake_case
    const identifier = paths
      .flatMap(p => p.split("_"))
      .map((w, index) => {
        if (index != 0) {
          return w.toCapitalizeCase();
        } else {
          return w.toLowerCase();
        }
      })
      .join("");

    return {
      ...split,
      ext: ext,
      identifier: identifier
    };
  }

  /// 分割path
  _splitPath(path) {
    const paths = path.split("/");
    const resolution = paths[paths.length - 2];
    if (resolution.match(this._resolutionRgx)) {
      paths.splice(paths.length - 2, 1);
      return {
        resolution: resolution,
        path: path,
        paths: paths
      };
    }

    return {
      paths: paths
    };
  }

  /// 除去后缀的文件名
  _fileNameWithoutExt(path, ext) {
    if (!ext) {
      const p = require("path");
      ext = p.extname(path);
    }
    return path.replace(ext, "");
  }
}

module.exports = AssetsInfo;
