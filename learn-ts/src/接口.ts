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

 
// 任意属性 [key: string] : any;

// 函数接口
// 对函数的一个约束
// type Cost = (price: number) => number;
interface Cost {
    (price: number): number;
}

// 可索引接口
// 对数组和对象进行约束
interface u {
    [index: number]: string
}

// 类的接口
// 用接口约束类

interface C {
    name: string;
    speak(words: string): void;
}
class Dog implements C {
    name: string;
    speak(words: string): void {
        console.log(words);
    }
}

// 用接口约束类的构造函数
