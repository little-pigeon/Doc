# 关于js模块
模块化，使得JavaScript的大规模工程成为可能
## 1、模块的标准
js模块最初的样子
```js
;(function(){}()
// 无法导入到其他模块中，从而出现了require/sea等框架，实现管理模块功能
```

进化后的样子
```js
//node的module遵循CommonJS规范
// requirejs遵循AMD
// seajs遵循CMD

// -------- node -----------
module.exports = {
  a : function() {},
  b : 'xxx'
};
require('path') // 导入模块

// ----------- AMD or CMD ----------------
define(function(require, exports, module){
  module.exports = {
    a : function() {},
    b : 'xxx'
  };
});
require('path') // 导入模块

// -------------- ES6 ---------------
export default ()=>{}
import  // 导入模块
```

## 2、模块的优点
a、大化小，更易于维护
b、功能明确，更易于测试


webpack 主要以entry文件为入口形成的依赖链，对依赖文件的类型，进行监听，loader任务，打包合并，专业处理打包各种规范模块

gulp 主要以监听物理目录下文件，执行进行配置的任务流

最佳实践是gulp负责工作流生命周期里面的样式图片等资源整理合并，webpack负责脚本模块打包合并（组件开发）。

面向任务的工作由 gulp 来做，例如启动个服务，清理个目录；面向模块依赖（模块打包，切割，注入）的则有 webpack 来做

先说重点：webpack 是一个打包工具，gulp 是一个自动化工具。