import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import * as types from './action-types';
import './index.css';
const CounterContext1 = React.createContext();
const CounterContext2 = React.createContext();
//CounterContext={Provider,Consumer}
const Counter1 = () => {
  let { state1, dispatch1 } = useContext(CounterContext1);
  return (
    <div>
      <div>Counter1</div>
      <p>{state1.number}</p>
      <button onClick={() => dispatch1({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch1({ type: types.DECREMENT })}>-</button>
    </div>
  );
};
const Counter2 = () => {
  let { state2, dispatch2 } = useContext(CounterContext2);
  return (
    <div>
      <div>Counter2</div>
      <p>{state2.number}</p>
      <button onClick={() => dispatch2({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch2({ type: types.DECREMENT })}>-</button>
    </div>
  );
};
const Counter3 = () => {
  return (
    <CounterContext2.Consumer>
      {(value) => (
        <>
          <div>Counter3 不使用useContext时的使用方法</div>
          <p>{value.state2.number}</p>
          <button onClick={() => value.dispatch2({ type: types.INCREMENT })}>
            +
          </button>
          <button onClick={() => value.dispatch2({ type: types.DECREMENT })}>
            -
          </button>
        </>
      )}
    </CounterContext2.Consumer>
  );
};

export default function App() {
  let [state1, dispatch1] = useReducer(reducer, { number: 0 });
  let [state2, dispatch2] = useReducer(reducer, { number: 0 });
  return (
    <>
      <CounterContext1.Provider value={{ state1, dispatch1 }}>
        <Counter1 />
      </CounterContext1.Provider>

      <CounterContext2.Provider value={{ state2, dispatch2 }}>
        <Counter2 />
        <Counter3 />
      </CounterContext2.Provider>
    </>
  );
}
