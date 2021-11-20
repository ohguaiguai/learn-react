import React from 'react';
import ReactDOM from 'react-dom';
/**
JSX属性和表达式
表达式就是一个大括号,里面放着一些变量和变量运算符
jsx更像javascript而非html
属性 class=>className
jsx也是对象，可以作为方法的参数和返回值
 */
let root: HTMLElement | null = document.getElementById('root');
function greeting(name?: string): React.ReactElement {
  if (name) {
    return <h1>Hello,{name}</h1>;
  }
  return <h1>Hello 陌生人</h1>;
}
let ele = greeting();
ReactDOM.render(ele, root);
