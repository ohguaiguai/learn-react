import React from 'react';
import ReactDOM from 'react-dom';
/**
 * jsx就是js+xml(html) 是一种JS的扩展语法
 * jsx js extension js扩展
 * jsx其实是一种语法糖，最终会运行的时候会经过babel的转义
 * React.createElement("h1", null, "Hello");
 *
 */
/**
 * ele就是所谓的React元素
 * React元素是构成React应用的最小单位
 * React元素用来描述你在屏幕上看到的内容
 * React元素其实就是一个普通的JS对象，它里面有的很多的属性，描述了元素的样子
 * ReactDOM.render可以保证浏览器界面的显示和React元素保持一致
 * JSX属性和表达式
 */
let ele = React.createElement('h1', null, 'Hello');
console.log(ele); //{type:'h1',props:{children:'Hello'}}
ReactDOM.render(ele, document.getElementById('root'));

// jsx的执行过程

// 1.使用jsx语法编写代码
// 2.webpack使用babel-loader把jsx转为js写法
// 3.在浏览器中执行createElement方法，得到虚拟DOM，也就是react元素
// 4.把虚拟DOM给了ReactDOM.render，把虚拟DOM转为真实的DOM，并插入页面
