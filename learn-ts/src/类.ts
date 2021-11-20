/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-06-18 11:58:58
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-18 14:44:45
 */
/**
 * 类
 * TS声明一个类的时候，其实得到了两个类型（类型声明空间）, 一个变量（变量声明空间）
 * 1. 实例的类型
 * 2. 类本身构造函数的类型
 * "strictPropertyInitialization": true, 在类中定义属性的时候必须初始化一个值
 */

class Person {
  name: string;
  getName(): void {}
}

// 存取器
// public 相当于即声明又赋值
class User {
  public myName = '';
  get name() {
    return this.myName;
  }
  set name(value) {
    this.myName = value.toUpperCase();
  }
}
let user = new User();

console.log(user);

// readonly 和 const
// readonly是编译时检查，const是运行时检查
// public: 可以被自己类本身、子类和其他(指的是类的 '{}'外面)访问
// protected： 本身和子类能够访问，其他不能访问
// private：只有本身可以访问，子类和其他都不能访问

// 静态属性: static
// 静态方法：static
// 子类还可以继承父类的静态属性和静态方法内部是： Child.__proto__ = Father

/**
 * 装饰器
 * React中的 @connect
 */

// 1. 类的装饰器，用在类声明之前，用来监视、修改和替换类的定义
// 2. 类的属性装饰器
// 3. 类的方法装饰器
// 4. 类的参数装饰器 next.js中用到过

// 命名空间， 可以在一个文件中定义多个相同命名的变量、函数或者类
namespace ns {
  // 同名的类和接口定义的类型，属性会进行合并
  interface Person {
    name: string;
    eat: () => void;
  }
  // target指的是Person类
  // target: Person是不行的， 这样的话Person是实例类型，而不是类类型
  function enhancer(target: typeof Person) {
    target.prototype.name = 'zx';
    target.prototype.eat = function () {
      console.log(this.name);
    };
  }
  @enhancer
  class Person {}
  let p: Person = new Person();
  p.name;
  p.eat();
}

// 不同类别从上往下
// 同一类别从下往上
// 类装饰器总是最后执行
