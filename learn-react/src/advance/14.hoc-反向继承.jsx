import React from "react";
import ReactDOM from "react-dom";

class Button extends React.Component {
  componentDidMount() {
    console.log("Button componentDidMount");
  }
  render() {
    console.log("Button render");
    return <button />;
  }
}

const wrapper = (OldComponent) => {
  return class extends OldComponent {
    state = { number: 0 };

    // 覆盖了父级的声明周期, 可见高阶组件的反向继承并不是简单的父子组件的关系
    componentDidMount() {
      console.log("WrapperButton componentDidMount");
      super.componentDidMount(); // 可以调用OldComponent的componentDidMount声明周期
    }

    handleClick = () => {
      this.setState({
        number: this.state.number + 1,
      });
    };

    render() {
      console.log("WrapperButton render");
      let renderElement = super.render(); // 执行父组件OldComponent的render方法，返回一个空button
      let newProps = {
        ...renderElement.props,
        onClick: this.handleClick,
      };
      return React.cloneElement(renderElement, newProps, this.state.number);
    }
  };
};

let WrapperButton = wrapper(Button);
ReactDOM.render(<WrapperButton />, document.getElementById("root"));
