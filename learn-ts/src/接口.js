"use strict";
/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-06-18 15:06:47
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-18 16:01:29
 */
/**
 * 接口
 * 行为的抽象  使用类来implements接口
 * 对象的形状
 */
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.speak = function (words) {
        console.log(words);
    };
    return Dog;
}());
// 用接口约束类的构造函数
