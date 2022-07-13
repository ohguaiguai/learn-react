import React, { useState } from "react";

import ReactDOM from "react-dom";

const Modal = ({ visible = false }) => {
  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(<div>这是modal</div>, document.body);
};

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>open</button>
      <Modal visible={visible} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// 事件冒泡会正常工作 —— 通过将事件传播到 React 树的祖先，事件冒泡将按预期工作，而与 DOM 中的 Portal 节点位置无关。
// React 可以控制 Portal 节点及其生命周期 — 当通过 Portal 渲染子元素时，React 仍然可以控制它们的生命周期。
// React Portal 只影响 DOM 结构 —— Portal 只会影响 HTML DOM 结构，而不会影响 React 组件树。
// 预定义的 HTML 挂载点 —— 使用 React Portal 时，你需要提前定义一个 HTML DOM 元素作为 Portal 组件的挂载。
