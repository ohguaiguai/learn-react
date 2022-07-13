import React from "react";
import ReactDOM from "react-dom";
let root: HTMLElement | null = document.getElementById("root");
let names: Array<string> = ["张三", "李四", "王五"];
let elements: Array<React.ReactElement> = [];
for (let i = 0; i < names.length; i++) {
  elements.push(<li>{names[i]}</li>);
}
ReactDOM.render(<ul>{elements}</ul>, root);
