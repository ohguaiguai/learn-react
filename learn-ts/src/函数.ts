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
function hello(name: string): void {
  console.log("hello");
}
// 函数表达式: 编译的时候只声明，不赋值, 那么怎么约定返回类型呢？
type UserFunction = (a: string, b: string) => string;
let getUserName: UserFunction = function (firstName: string, lastName: string) {
  return firstName + lastName;
};

// 可选参数  ? , 必须是最后一个

// IMP: 默认参数 

// IMP: 剩余参数 ...numbers: number[]
function sum(prefix: string, ...numbers: number[]) {
    return prefix + numbers.reduce((acc, cur) => acc + cur, 0);
}


// 函数重载
// 函数名字一样，但是函数参数的类型或者个数不一样, 返回值一样
// 函数的重载声明和实现之间不能有别的代码

