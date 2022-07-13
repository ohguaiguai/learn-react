import React from "react";
import ReactDOM from "react-dom";

interface State {
  name: string;
}

interface Props {
  type?: string;
}

// 高阶组件
// 把一个input组件变为受控组件
export function HOC(WrappedComponent: React.ComponentClass) {
  return class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        name: "",
      };
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      this.setState({
        name: event.target.value,
      });
    };

    render() {
      const newProps = {
        value: this.state.name,
        onChange: this.onChange,
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

// 使用
class Input extends React.Component {
  render() {
    console.log(this.props);
    return <input {...this.props} />;
  }
}

const WithInput = HOC(Input);

ReactDOM.render(<WithInput type="hoc" />, document.getElementById("root"));
