import React from "react";
import ReactDOM from "react-dom";
interface Props {
  name: string;
}
interface State {
  number: number;
}
//状态更新可能会被合并
class Counter extends React.Component<Props, State> {
  state = { number: 0 };
  handleClick = (event: React.MouseEvent) => {
    //这里的状态并不是完整的状态，而一个部分状态，这个部分状态合被合并到总的状态树上去
    //新老属性都有则覆盖，新的有老的状态没有此属性则追加，老的有新的没有则保持原来的状态
    this.setState({ number: this.state.number + 1 });
  };
  add = () => {
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    return (
      <div>
        <p>
          {this.props.name}:{this.state.number}
        </p>
        <button onClick={this.handleClick}>+</button>
        <hr />
        <SubCounter {...this.props} {...this.state} add={this.add} />
      </div>
    );
  }
}
//子组件如何修改父组件的状态?
//组件的状态是私有的外界组件不管是爹还是儿子都不能直接访问或修改。
/* class SubCounter extends React.Component<Props & State & { add: any }> {
    render() {
        return (
            <div>
                <p>{this.props.name}:{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
            </div>
        )
    }
} */
type SubCounterProps = Props & State & { add: any };
//React.SFC React.FunctionComponent 就是指函数组件   Stateless Function Component
let SubCounter: React.FunctionComponent<SubCounterProps> = function (
  props: SubCounterProps
) {
  return (
    <div>
      <p>
        {props.name}:{props.number}
      </p>
      <button onClick={props.add}>+</button>
    </div>
  );
};
ReactDOM.render(<Counter name="计数器" />, document.getElementById("root")!);
