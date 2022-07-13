import React from "react";
import ReactDOM from "react-dom";
interface Props {}
interface State {
  number: number;
}
class Clock extends React.Component<Props, State> {
  timerID: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      //this.state就代表当状态，只有在构造 函数里才能直接 赋值给this.state. 其它地方只能用setState
      number: 0,
    };
  }
  //组件挂载完成后会执行此生命周期函数
  /**
   * setState 设置新的状态，设置完新的状态之后会引起界面的更新
   */
  componentDidMount() {
    this.timerID = window.setInterval(() => {
      this.setState({ number: this.state.number + 1 });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
      </div>
    );
  }
}
ReactDOM.render(<Clock />, document.getElementById("root")!);
