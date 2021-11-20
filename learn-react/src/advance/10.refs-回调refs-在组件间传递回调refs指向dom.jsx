import React from 'react';
import ReactDOM from 'react-dom';

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  inputElement = null;
  componentDidMount() {
    console.log(this.inputElement);// CustomTextInput 挂载完成后去更新 inputRef, 从而 Parent 中就会拿到 input
  }
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}

// 不能在组件中传递 ref
// function CustomTextInput(props) {
//   return (
//     <div>
//       <input ref={props.inputRef} />
//     </div>
//   );
// }

// class Parent extends React.Component {
//   inputRef = React.createRef();
//   componentDidMount() {
//     console.log(this.inputElement); // undefined， 因为 Parent 并不会等到 CustomTextInput 挂载完成后才去更新 inputRef
//   }
//   render() {
//     return (
//       <CustomTextInput
//         inputRef={this.inputRef}
//       />
//     );
//   }
// }

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);

