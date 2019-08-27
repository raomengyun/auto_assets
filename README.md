# 1. 解决的问题

1. Flutter 以文件夹形式声明资源时。只添加 2x 3x 图，Flutter 的搜索系统是无法查找出对应资源的，原因见 [mechanism](https://g.hz.netease.com/wc-flutter/document/mechanism)。
2. Flutter 资源是直接拷贝至 Native 端的，需要进行压缩，工具: imagemin。
3. 资源强类型化是更好的资源管理方式，因为 Dart 是静态强类型语言，我们可以借助这个特征来自动分析未使用的资源，方便未来的资源管理。

# 2. 实施

1. 自动监听资源文件夹，自动生成 assets 声明并插入 pubspec.yaml 文件中.
2. 自动压缩图片资源。
3. 使用类型来声明并且引用图片资源，例如：
   ````dart
   class AssetImages {
      AssetImages._();

      static AssetImage _commonIconClose() =>
        const AssetImage('assets/common/icon_close.png'); // 懒加载
      static AssetImage get commonIconClose => _commonIconClose();
   }
   ````

# 3. 工具安装

`auto_assets` 是使用 `nodejs` 开发的工具，安装需要有 `node` 环境。

1. 安装 `nodejs`：https://nodejs.org/en/download/
2. 安装包管理器 [yarn](https://yarnpkg.com/zh-Hant/)：`npm install yarn -g`
3. 执行命令：`yarn global add https://g.hz.netease.com/wc-flutter/auto_assets.git`
4. 安装完之后即可使用 `auto_assets` 命令

# 4. 工具使用

## 4.1. 项目配置

在项目根目录下建一个 `assets_config.json` 文件，文件内容：
````json
{
  "assets": "assets/",
  "code": "lib/assets/"
}
````

- `assets` 代表资源的根目录
- `code` 代表自动生成的代码的根目录

## 4.2. 执行命令

````shell
auto_assets [Flutter项目根目录]
````

执行命令后，资源文件夹内所有的变动都会自动更新到自动生成的代码上。

# 样例

参考 [yuedu_login_sample](https://g.hz.netease.com/wc-flutter/yuedu_login_sample);

# 5. 资源规范

1. 使用文件夹分割不同模块，例：登录模块 `login`，通用模块 `common`。
2. 资源命名**严格**遵守 [snake_case](https://en.wikipedia.org/wiki/Snake_case)：使用下挂线分割不同单词。
3. 屏幕变种使用文件夹而非文件名表示（Flutter 的规范），谨记变种永远是在倒数第二个路径上。
4. 同一个资源的不同屏幕变种`2x/3x`，必须使用相同的文件命名。
5. 同一个资源的不同变种必须是同一中文件格式。

样例：
````
/// 登录模块-手机icon
login/2x/icon_phone.png
login/3x/icon_phone.png

/// 书架模块-书架管理子模块-选中icon
shelf/management/2x/icon_select.png
shelf/management/3x/icon_select.png
````

# 6. TODO

1. 同一个资源的不同变体必须要有同一种文件后缀。
2. 校验 resolution path 的位置对不对，2x 3x 应该是在倒数第二个 path 节点上。
3. 重名排除，例如 `a/b/c.png` 与 `a/b_c.png` 会生成重名 identifier