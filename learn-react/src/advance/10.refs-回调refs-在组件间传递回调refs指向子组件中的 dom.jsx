import React from "react";
import ReactDOM from "react-dom";

function CustomTextInput(props) {
  return (
    <div>
      <input name="child" ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  inputElement = null;
  componentDidMount() {
    console.log(this.inputElement); // CustomTextInput 挂载完成后去更新 inputRef, 从而 Parent 中就会拿到 input, (声明周期的执行顺序是: 子组件的 componentDidMount -> 父组件的 componentDidMount)
  }
  render() {
    return <CustomTextInput inputRef={(el) => (this.inputElement = el)} />;
  }
}

ReactDOM.render(<Parent />, document.getElementById("root"));
