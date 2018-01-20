# 关于js模块
模块化，使得JavaScript的大规模工程成为可能
## 1、模块的标准
js模块最初的样子
```js
;(function(){})()
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

## 2、模块模式，也译为模组模式
是一种通用的对代码进行模块化组织与定义的方式。

`
/*
1、将jQuery和window作为参数传入，从而避免了模块内部有外部变量的引用，实现了模块的独立性和封装。同时也避免了JavaScript 解释器反向遍历作用域链来查找jQuery变量和window等隐式全局变量的声明（如果解释器反向遍历，找不到这两个变量声明，则会假定这两个变量为全局变量）
2、将引用的对象作为参数，使它们得以和函数内的其它局部变量区分开来；同时还可以给全局对象起一个别名，比如 “q”，“w”
3、引用参数module，是利于模块的扩展，方便我们数个文件中分别编写一个模块的不同部分，比如module.chidlA，module.chidlB，松耦合扩展，紧耦合扩展；
*/
;(function (q, w, m) { // 01
  // q is jQuery
  // w is window
  // 局部变量及代码
  // 返回
  var module = {}, // var module = m // 如果m=module为真，则为紧耦合扩展；如果m={}，则为松耦合扩展；紧耦合有加载顺序要求，需先保存module的属性值，然后才能重写相应的属性值
      privateVariable = 1; //var temp = m.privateVariable; m.privateVariable = 1 

    function privateMethod() {
        // ...
    }

    module.moduleProperty = 1;
    module.moduleMethod = function () {
        // ...
    };

    w.module = module;
})(jQuery, window, module || {});

// 01和02的栗子的区别
// 前者需将module绑定到window变量上；后者则是将module绑定到变量MODULE上

var MODULE = (function () { // 02
    var module = {},
        privateVariable = 1;

    function privateMethod() {
        // ...
    }

    module.moduleProperty = 1;
    module.moduleMethod = function () {
        // ...
    };

    return module;
}());

// 03和前两者的区别
// 03实现了模块环境探测功能，使得模块可以运行在CMD/AMD/一般环境中
( function( global, factory ) { // 03

    // 这是jquery的模块环境探测处理

    // typeof window !== "undefined" ? window : this
    // 作用：如果这不是一个浏览器端的 JS 库，而是一个通用的库，除了可以在浏览器端运行，也可在node端运行的话，那么window就不是顶层对象了，而this的指引是全局对象
    // 也可将this替换为(0, eval)('this')，这表达式运行后，也可得到一个全局对象；其实获取全局对象的方式挺多的，可自行查阅

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) { // cmd
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
     
})
`

## 2、模块的优点
a、大化小，更易于维护

b、功能明确，更易于测试