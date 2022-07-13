import React from "react";
import ReactDOM from "react-dom";
interface Props {}
interface State {
  number: number;
}
class Counter extends React.Component<Props, State> {
  state = { number: 0 };
  //箭头函数可以保证函数里的this永远指向Counter类的实例
  //   setState的更新可能是异步，多个setState可能会被合并成一个
  handleClick = (event: React.MouseEvent) => {
    //在事件处理函数中调用setState的时候，this.state的状态没有真正改变
    //如果我想从上一个状态计算下一个状态的话，需要传递一个函数而非状态对象
    /*
        this.setState((state) => ({ number: state.number + 1 }));
         this.setState((state) => ({ number: state.number + 1 }));
         this.setState((state) => ({ number: state.number + 1 })); 
        */
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number); //0
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number); //0
    //setTimeout里的代码比较特殊，不会走批量更新，会立刻进行更新
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number); //2
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number); //3
    }, 0);
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root")!);
