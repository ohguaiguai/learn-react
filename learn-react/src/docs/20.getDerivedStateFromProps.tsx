import React, { Component } from "react";
import ReactDOM from "react-dom";
interface Props {}
interface State {
  number: number;
}
//getDerivedStateFromProps
class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <hr />
        <ChildCounter n={this.state.number} />
      </div>
    );
  }
}
interface ChildCounterProps {
  n: number;
}
interface ChildCounterState {
  number: number;
}
class ChildCounter extends Component<ChildCounterProps> {
  state = { number: 0 };
  //把属性映射为新的状态 ,它返回的就是新的状态对象
  //这个getDerivedProps为啥就没有副作用了，效率在哪儿提高了？改过之后感觉周期不怎么清晰
  componentWillReceiveProps() {
    //已经废弃，取而代之的就是getDerivedStateFromProps
  }
  static getDerivedStateFromProps(
    nextProps: ChildCounterProps,
    prevState: ChildCounterState
  ) {
    const { n } = nextProps;
    if (n % 2 === 0) {
      return { number: n * 2 };
    } else {
      return { number: n * 3 };
    }
  }
  shouldComponentUpdate(): boolean {
    return this.state.number % 2 == 0;
  }
  //render是把创建的react组件转换成真实的dom元素
  //render是一个函数，它把react组件转成虚拟DOM元素
  //react-dom负责把虚拟DOM变成真实DOM
  render() {
    //return React.createElement('div',null,this.state.number)
    //{type:'div',props:{children:this.state.number}}
    return <div>{this.state.number}</div>;
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
