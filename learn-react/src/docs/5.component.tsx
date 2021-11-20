import React from 'react';
import ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');

/**
 * 什么叫组件，如何定义组件
 * 定义组件有两种方式 函数式组件和类组件
 * 函数式组件就是一个函数，接收一个属性对象并返回React元素
 * 函数式组件如何渲染
 * 1. 收集props对象
 * 2. 把属性对象传入函数并返回React元素
 * 3. 把React元素渲染到页面上
 *
 * 类组件
 */
interface Props {
  name: string;
}

const Welcome: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  return <h1>hello {props.name}</h1>;
};
//props={name:'zhufeng'}

class Welcome2 extends React.Component<Props> {
  render(): React.ReactElement {
    return <h1>hello {this.props.name}</h1>;
  }
}
let Welcome3: React.ComponentClass<Props> = Welcome2;
/**
 * 如何渲染类组件
 * 1. 也是收集props对象
 * 2. 实例化Welcome2类的实例
 * 3. 调用Welcome2实例的render方法，获得返回的React元素
 * 4. 把返回的React元素渲染到界面上就可以了
 */
ReactDOM.render(<Welcome3 name='zhufeng' />, root);
/**
 * 1.React元素可以是DOM标签，也可以是用户自定义组件
 * 2. DOM标签首字母小写的，自定义组件首字母大写
 * 3.组件要先定义再使用
 * 4.函数组件或者类组件的render方法要返回并且只能返回一个React顶级元素
 */
