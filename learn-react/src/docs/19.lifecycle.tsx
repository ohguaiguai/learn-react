import React, { Component } from 'react';
import ReactDOM from 'react-dom';
interface Props {}
interface State {
  number: number;
}
class Counter extends React.Component<Props, State> {
  // 他会比较两个状态相等就不会刷新视图 PureComponent是浅比较
  static defaultProps = {
    name: '珠峰架构',
  };
  constructor(props: Props) {
    super(props);
    this.state = { number: 0 };
    console.log('1.constructor构造函数');
  }
  componentWillMount() {
    // 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次
    console.log('2.组件将要加载 componentWillMount');
  }
  componentDidMount() {
    console.log('4.组件挂载完成 componentDidMount');
  }
  handleClick = () => {
    //状态一改变就会更新刷新
    this.setState({ number: this.state.number + 1 });
  };
  // react可以shouldComponentUpdate方法中优化 PureComponent 可以帮我们做这件事
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    // 代表的是下一次的属性 和 下一次的状态
    console.log('5.组件是否更新 shouldComponentUpdate');
    //判断数字是否是偶数 偶数返回true,奇数返回false
    return nextState.number % 2 == 0;
    // return nextState.number!==this.state.number; //如果此函数种返回了false 就不会调用render方法了
  } //不要随便用setState 可能会死循环
  componentWillUpdate() {
    console.log('6.组件将要更新 componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('8.组件完成更新 componentDidUpdate');
  }
  render() {
    console.log('3.render 或7.组件重新渲染');
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number > 3 ? null : <ChildCounter n={this.state.number} />}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
interface ChildCounterProps {
  n: number;
}
class ChildCounter extends Component<ChildCounterProps> {
  //当一个组件将要被销毁的时候，会执行componentWillUnmount
  componentWillUnmount() {
    console.log('child 组件将要卸载componentWillUnmount');
  }
  componentWillMount() {
    console.log('child componentWillMount');
  }
  render() {
    console.log('4.child render');
    return <div>{this.props.n}</div>;
  }
  componentDidMount() {
    console.log('child componentDidMount');
  }
  componentWillReceiveProps(newProps: Props) {
    // 第一次不会执行，之后属性更新时才会执行
    console.log('child 1. componentWillReceiveProps');
  }
  shouldComponentUpdate(nextProps: ChildCounterProps, nextState: State) {
    console.log('child 2. shouldComponentUpdate');
    return nextProps.n % 3 == 0; //子组件判断接收的属性 是否满足更新条件 为true则更新
  }
  componentWillUpdate() {
    console.log('child 3. componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('child 4. componentDidUpdate');
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
