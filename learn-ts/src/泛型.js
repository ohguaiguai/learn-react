"use strict";
var g;
(function (g) {
    // type只是定义一个类型别名 ， interface才是真正的类型
    // 接口只是一个类型，用来修饰对象或者类
    // 在定义函数、接口或者类的时候，不预先指定具体的类型而是使用的时候指定
    // 也像是一个参数 <T>
    // 类数组
    // arguments
    // HTMLCollection
    // NodeListOf<ChildNode>
    function sum1() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var args2 = arguments;
        for (var i = 0; i < args2.length; i++) {
            console.log(args[i]);
        }
    }
    var add = function (a, b) {
        return a;
    };
    add(1, 'a');
    // 泛型约束
    //
})(g || (g = {}));
