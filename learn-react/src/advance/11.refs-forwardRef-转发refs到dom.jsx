import React from 'react';
import ReactDOM from 'react-dom';

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();


ReactDOM.render(
  <FancyButton ref={ref}>Click me!</FancyButton>,
  document.getElementById('root')
);

console.log(ref);
