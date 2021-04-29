import React from 'react';
import ReactDOM from 'react-dom';

class CustomTextInput extends React.Component {
    textInput = null;

    // setTextInputRef = element => {
    //   console.log('ref', element);
    //   this.textInput = element;
    // };

    focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  
    componentDidMount() {
      // 组件挂载后，让文本框自动获得焦点
      this.focusTextInput();
    }
  
    render() {
      // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
      // 实例上（比如 this.textInput）
      // React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。
      return (
        <div>
          <input
            type="text"
            ref={element => {
              console.log('ref', element);
              this.textInput = element;
            }}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }

  ReactDOM.render(
    <CustomTextInput />,
    document.getElementById('root')
  );
  