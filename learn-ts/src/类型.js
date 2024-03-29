"use strict";
/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-06-18 10:28:12
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-18 15:53:43
 */
var married = false;
// Cannot redeclare block-scoped variable 'name'.ts(2451)，已经有window.name了
//  let name: string = 'zhangxing';
// tuple 元组类型，表示一个已知数量和类型的数组； 数组类型唯一，数量不确定
var zhangxing = ['zhangxing', 5];
// 枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["MAN"] = 0] = "MAN";
    Gender[Gender["FEMALE"] = 1] = "FEMALE";
})(Gender || (Gender = {}));
console.log(Gender); // {'0': 'MALE', '1': 'FEMALE', 'MALE': 0, 'FEMALE': 1}
// any 可以赋值给任意类型
// - 第三方库没有提供类型声明
// - 类型转换遇到困难
// - 数据结构太复杂
// ts给DOM BOM都提供了类型声明
// !非空断言
// null undefined 是其他类型的子类型，可以赋值给其他类型
var x;
x = 1;
x = undefined; // 需要开启 "strictNullChecks": false,      
var y;
// void 空类型
// undefined 可以赋值给void； "strictNullChecks": true时null也可以赋值给void   
// never 永远不会出现的值; 是null和undefined的子类型
// 1. 作为不会返回函数的返回值类型。
// let ret: never = Error('hello');
// 2. 表示永远达不到终点，比如死循环不会结束，类型就是never
// never void区别： void可以赋值为null，undefined, 但never不包含任何值
// 定义void返回值类型的函数能正常执行，never返回值类型的函数永远不会有返回，无法终止
// 类型推论
var a = 1;
var b = '';
var c;
// 包装对象 Wrapper Object
// JS类型分为两种： 原始数据类型和引用类型
// 原始类型是没有属性和方法的
// 联合类型
var name1;
// 类型断言
// 可以把一个联合类型的变量指定为一个更加具体的类型
// !只是非空断言
var name2;
name2.length; // 断言成一个string
name2.toFixed(2);
name2.toFixed(2);
// 字面量和联合类型的区别: 前者是值的联合，后者是类型的联合
