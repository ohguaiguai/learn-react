import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Counter extends React.Component {
  state = { number: 0 };
  buttonClick = () => {
    debugger;
    console.log('buttonClick');
    this.setState(
      (state) => ({ number: state.number + 1 }),
      () => {
        console.log(this.state.number);
      }
    );

    this.setState(
      (state) => ({ number: state.number + 1 }),
      () => {
        console.log(this.state.number);
      }
    );

    // setTimeout(() => {
    //   ReactDOM.unstable_batchedUpdates(() => {
    //     this.setState(
    //       (state) => ({ number: state.number + 1 }),
    //       () => {
    //         console.log(this.state.number);
    //       }
    //     );

    //     this.setState(
    //       (state) => ({ number: state.number + 1 }),
    //       () => {
    //         console.log(this.state.number);
    //       }
    //     );
    //   });
    // });
  };
  divClick = () => {
    console.log('divClick');
  };
  render() {
    return (
      <div onClick={this.divClick} id="counter">
        <p>{this.state.number}</p>
        <button onClick={this.buttonClick}>+</button>
      </div>
    );
  }
}

export default Counter;
