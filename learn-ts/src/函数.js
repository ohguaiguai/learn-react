"use strict";
/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-06-18 11:26:46
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-18 15:49:51
 */
/**
 * 函数
 */
// 字面量: 编译的时候即声明又赋值
function hello(name) {
    console.log("hello");
}
var getUserName = function (firstName, lastName) {
    return firstName + lastName;
};
// 可选参数  ? , 必须是最后一个
// IMP: 默认参数 
// IMP: 剩余参数 ...numbers: number[]
function sum(prefix) {
    var numbers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        numbers[_i - 1] = arguments[_i];
    }
    return prefix + numbers.reduce(function (acc, cur) { return acc + cur; }, 0);
}
// 函数重载
// 函数名字一样，但是函数参数的类型或者个数不一样, 返回值一样
// 函数的重载声明和实现之间不能有别的代码
