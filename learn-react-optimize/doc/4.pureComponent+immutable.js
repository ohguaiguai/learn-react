/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-07-07 14:27:22
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-07-09 09:37:56
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, is } from 'immutable';

class PureComponent extends Component {
  // shouldComponentUpdate 默认返回true
  shouldComponentUpdate(newProps) {
    return !shallowEqual(this.props, newProps);
  }
}
function shallowEqual(obj1, obj2) {
  // 不是对象
  if (obj1 === obj2) {
    return true;
  }
  // 不是对象也不是null
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }
  // 对象
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || !is(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
class App extends Component {
  state = { counter: Map({ number: 0 }) };
  add = () => {
    /**
    let oldState = this.state;
    let amount = parseInt(this.amount.value);
    this.setState({counter:{ number: oldState.counter.number + amount }});
    */
    this.state.counter = this.state.counter.set(
      'number',
      this.state.counter.get('number') + parseInt(this.amount.value)
    );
    this.setState(this.state);
  };
  render() {
    console.log('App render');
    return (
      <div>
        <Counter counter={this.state.counter} />
        <input ref={(inst) => (this.amount = inst)} />
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}
class Counter extends PureComponent {
  render() {
    console.log('Counter render');
    return <p>{this.props.counter.number}</p>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
