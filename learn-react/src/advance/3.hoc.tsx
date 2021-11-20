import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
/**
 * 高阶组件 来自于高阶函数
 * 高阶函数 就是函数可以作为方法的参数和返回值
 * function(oldFn){return newFn}
 * 高阶组件 组件可以作为函数的参数和返回值
 * 普通组件是把 props 转换为 ui， 高阶组件是把组件转换为另一个组件
 */
//是一个函数，需要接收一个老组件，返回一个新组件,把逻辑写在新组件
function logger(OldComponent) {
  return class extends React.Component {
    start: number;
    componentWillMount() {
      this.start = Date.now();
    }
    componentDidMount() {
      console.log('组件渲染一共花了 ' + (Date.now() - this.start) + ' ms');
    }
    render() {
      return <OldComponent />;
    }
  };
}
/**
 * 1.麻烦呗，需要修改所有的组件
 * 2.侵入老代码
 */
class Hello extends React.Component {
  render() {
    return <div>hello</div>;
  }
}
let LoggerHello = logger(Hello);
ReactDOM.render(<LoggerHello />, document.getElementById('root'));
