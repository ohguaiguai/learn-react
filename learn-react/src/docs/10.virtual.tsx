import React, { ReactElement } from "../lib/react";
import ReactDOM from "../lib/react-dom/react-dom";
let style = { color: "red", fontSize: "25px" };
/* let element = (
    <h1 className="title" style={style}>
        hello
    </h1>
) */
let element: ReactElement = React.createElement(
  "h1",
  {
    className: "title",
    style,
  },
  "hello",
  "world"
);
ReactDOM.render(element, document.getElementById("root")!);
