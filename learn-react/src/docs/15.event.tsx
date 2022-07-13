import React from "react";
import ReactDOM from "react-dom";
/**
 * 事件处理的时候，特别注意this指针问题
 * 1.可以bind ,缺点是每次渲染都会产生一个新的函数
 * 2.使用匿名函数缺点是每次渲染都会产生一个新的函数
 * 3.推荐使用箭头函数绑定this
 *
 */
class VisitButton extends React.Component {
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Property 'id' does not exist on type 'EventTarget'.
    console.log(event.currentTarget.id);
  };
  render() {
    return (
      <button id="visit-btn" onClick={this.handleClick}>
        点我吧
      </button>
    );
  }
}
ReactDOM.render(<VisitButton />, document.getElementById("root")!);
