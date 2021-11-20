import React from 'react';
import ReactDOM from 'react-dom'

export class CustomTextInput extends React.Component {
  // 创建一个 ref 来存储 textInput 的 DOM 元素
  textInput = React.createRef();

  constructor(props) {
    super(props);
  }

  focusTextInput = () => {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current?.focus();
  };

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input type='text' ref={this.textInput} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

class AutoFocusTextInput extends React.Component {
  textInput = React.createRef();

  componentDidMount() {
    // 调用实例的 focusTextInput 方法
    this.textInput.current.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}

ReactDOM.render(
  <AutoFocusTextInput />,
  document.getElementById('root')
);
