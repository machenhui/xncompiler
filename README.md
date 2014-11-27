# grunt-xncompiler

> The best Grunt plugin ever.
> 负责将符合基本commonjs 规范的代码，合并成单个文件，并去除全局变量

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xncompiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xncompiler');
```

## The "xncompiler" task

### Overview
In your project's Gruntfile, add a section named `xncompiler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xncompiler: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

###主要功能描述
#### 合并commonjs 文件到单个文件
#### 翻译commonjs 文件到普通模式，并输出依赖树
#### css 重命名混淆，支持默认加前缀处理
#### soy 模板编译，支持nodejs 环境，并支持css命名混淆
#### 指定cssRenameMap 去除js 文件中有关css 命名的引用


###TODO
 1 模板编译压缩工具的集成
 2.功能模块组件的拆分


