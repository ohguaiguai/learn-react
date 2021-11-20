namespace g {
  // type只是定义一个类型别名 ， interface才是真正的类型
  // 接口只是一个类型，用来修饰对象或者类

  // 在定义函数、接口或者类的时候，不预先指定具体的类型而是使用的时候指定
  // 也像是一个参数 <T>

  // 类数组
  // arguments
  // HTMLCollection
  // NodeListOf<ChildNode>
  function sum1(...args: number[]) {
    let args2: IArguments = arguments;
    for (let i = 0; i < args2.length; i++) {
      console.log(args[i]);
    }
  }

  // 泛型类

  // 接口泛型
  // 使用接口约束泛型的时候，泛型可以定义在接口名称里，也可以定义在函数里
  // 前者需要在使用这个接口类型的时候就要传入具体值进行确定
  // 后者需要在调用的时候才确定
  interface Calculate<A> {
    <B>(a: A, b: B): A;
  }
  let add: Calculate<number> = <C>(a: number, b: C) => {
    return a;
  };
  add<string>(1, 'a');

  // 泛型约束
  //
}
