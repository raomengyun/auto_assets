const UI = require("../ui/ui.js");

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

    const { capitalize } = require("lodash/string");
    /// 先约定命名为 snake_case
    const identifier = paths
      .slice(1, paths.length)
      .flatMap(p => p.split("_"))
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
      identifier: identifier
    };

    UI.verbose(`asset info: ${JSON.stringify(result)}`, 2);

    return result;
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
    return path
      .split(".")
      .slice(0, -1)
      .join(".");
  }
}

module.exports = AssetsInfo;
