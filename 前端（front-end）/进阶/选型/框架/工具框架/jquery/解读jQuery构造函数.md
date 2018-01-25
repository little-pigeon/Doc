## 关于jQuery构造函数的设计
```js
function( window, noGlobal ){
    "use strict";

    // 将其作为公共属性提供，可以覆盖或修改构造函数，而不会损害jQuery函数，并且可能需要在子实例上应用父构造函数的地方进行原型继承
    var jQuery = function( selector, context ) {
        // 先初始化了jQuery，然后再初始化jQuery.fn.init
        // 外部可以使用$,$()，而不用new $()
        return new jQuery.fn.init( selector, context );
    }

    // 一者，简化了prototype为fn；
    // 二者，语义也更明确（fn就是存方法的地方）
    jQuery.fn = jQuery.prototype = {} 

    // 甚是巧妙
    // 将init挂靠在jQuery原型上，暴露于外部实例；
    // 子类可以继承jquery，却不能继承jQuery.fn.init，保护了jQuery.fn.init，也就是保护了jQuery的实例（该实例即是new jQuery.fn.init() ）的核心不被修改；
    // jquery实例和继承了jquery的子类实例，都可以使用jQuery.fn.init的属性和方法
    // 如果直接使用var init = function() {}，那么虽然可以实现子类不能继承init，却不能实现jquery实例和jquery的子类实例，都可以使用init的属性和方法
    var init = jQuery.fn.init = function() {}
    init.prototype = jQuery.fn

    // 巧妙
    // 1、hi.extend增强hi类的扩展性
    // 2、hi.fn.extend增强hi类实例的扩展性
    // 3、统一了添加类方法和添加实例方法的方法，方便第三方扩展功能，也方便了自身添加功能
    jQuery.extend = jQuery.fn.extend = function() {}
    jQuery.extend({
        aF: function() {}
    });
    jQuery.fn.extend({
        bF: function() {}
    })

    // 巧妙的设置
    // 和第三方库共用$变量时，可以释放$的控制权，避免冲突
    // 使用的时候，也就可以用jQuery，而不能用$，也可以自定义 var hi = $.noConflict( true ); hi('.hi').css;
    var _jQuery = window.jQuery,
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // 暴露jQuery对象
    if ( !noGlobal ) {
        window.jQuery = window.$ = jQuery;
    }

    return jQuery;
}
```