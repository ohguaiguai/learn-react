import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
interface Props {}
interface InputProps {}

const TextInput = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return <input type="text" ref={ref} />;
  }
);
class Form extends React.Component<Props> {
  //HTMLInputElement是RefObject的current的值的类型
  public textInput: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.textInput = React.createRef();
  }
  getFocus = () => {
    this.textInput.current!.value = new Date().toLocaleTimeString();
    this.textInput.current!.focus();
  };
  render() {
    return (
      <>
        <TextInput ref={this.textInput} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    );
  }
}
//函数组件不能设置ref,为什么因为函数组件没有实例

ReactDOM.render(<Form />, document.getElementById("root")!);
