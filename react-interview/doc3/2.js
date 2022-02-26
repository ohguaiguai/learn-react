import * as React from 'react';
import * as ReactDOM from 'react-dom';
class Dialog extends React.Component{
    state = {show: false};
    componentDidMount() {
      document.addEventListener("click",  () => {
        console.log('handleDocumentClick');
        this.setState({show: false});
      });
    }
    //react16里绑定 document上去了
    handleButtonClick = (event) => {
      console.log('handleButtonClick');
      //event是合成事件对象，nativeEvent是它对应的原生事件对象
      //stopPropagation可以阻止向上冒泡，但是不能阻止后续的本级监听监听执行

      //event.nativeEvent.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      this.setState({show: true});
    };

    render() {
      return (
        <div>
          <button onClick={this.handleButtonClick}>显示</button>
          {this.state.show && (
            <div onClick={(event) => event.nativeEvent.stopImmediatePropagation()}>
              模态窗口
            </div>
          )}
        </div>
      );
    }
  }
ReactDOM.render(<Dialog />, document.getElementById('root'));
//在不同的浏览绑定事件，阻止默认事件可能实现方法一样
event.preventDefault()
return false;
//react合成事件使用标准的浏览器，帮我们抹平了浏览器的差异
