import React from "react";
import ReactDOM from "react-dom";
let root: HTMLElement | null = document.getElementById("root");
//如何更新DOM元素
/**
 * React元素本身是不可变的，当React元素被创建之后，
 * 更新界面的唯一方式就是创建一个新的元素,然后重新渲染
 * React更新的时候只会更新必要的部分
 */
function tick() {
  const ele: React.ReactElement = (
    <div>
      <h1>当前时间:</h1>
      <div>{new Date().toLocaleTimeString()}</div>
    </div>
  );
  ReactDOM.render(ele, root);
}
setInterval(tick, 1000);
