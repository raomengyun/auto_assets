## 解决的问题

1. Flutter 以文件夹形式声明资源时。只添加 2x 3x 图，Flutter 的搜索系统是无法查找出对应资源的，原因见 [mechanism](https://g.hz.netease.com/wc-flutter/document/mechanism)。
2. Flutter 资源是直接拷贝至 Native 端的，需要进行压缩，工具: imagemin。
3. 资源强类型化是更好的资源管理方式，因为 Dart 是静态强类型语言，我们可以借助这个特征来自动分析未使用的资源，方便未来的资源管理。

## 实施

1. 自动监听资源文件夹，自动生成 assets 声明并插入 pubspec.yaml 文件中
2. 自动压缩图片资源，png/jpg 等。
3. 使用类来声明并且引用图片资源，例如：
   ````dart
   class AssetImages {
      AssetImages._();

      static AssetImage _commonIconClose() =>
        const AssetImage('assets/common/icon_close.png'); // 懒加载
      static AssetImage get commonIconClose => _commonIconClose();
   }
   ````

## 资源规范

### 资源声明

### 资源命名以及模块划分

### 资源引用