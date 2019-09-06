# 1. 解决的问题

1. 自动生成 pubspec.yaml 资源声明。
2. 自动压缩资源（目前支持: jpg/jpeg/png/svg）。
3. 自动资源类型化，类似于的 Android 的 R.java，例如：

   ```dart
   class Assets {
      Assets._();
      static const String commonIconClose = "assets/common/icon_close.png";
   }

   class AssetImages {
      AssetImages._();
      static AssetImage get commonIconClose => const AssetImage(Assets.commonIconClose);
   }
   ```

# 2. 工具安装

`auto_assets` 是使用 `nodejs` 开发的工具，安装需要有 `node` 环境。

1. 安装 `nodejs`：https://nodejs.org/en/download/
2. 执行命令：`npm install auto_assets -g`
3. 安装完之后即可使用 `auto_assets` 命令

# 3. 工具使用

## 3.1. 项目配置

在项目根目录下新建 `assets_config.json` 文件，文件内容：

```json
{
  "assets": "assets/",
  "code": "lib/assets/"
}
```

- `assets` 代表项目中资源文件的根目录，有多个的时候可以传入数组。
- `code` 代表自动生成的代码的根目录。

## 3.2. 执行命令

```shell
auto_assets [Flutter项目根目录]
```

## 3.3. VSCode 插件

1. 在 VSCode -> Extensions 下搜索 `auto_assets` 并安装。
2. 重新打开项目。

# 4. 样例

TODO

# 5. TODO

1. 支持根据后缀归类不同的资源
2. 添加支持的后缀或者不支持的后缀配置项
3. 支持配置不包含的资源文件夹