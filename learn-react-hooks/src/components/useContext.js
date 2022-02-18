import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import * as types from './action-types';
const CounterContext1 = React.createContext();
const CounterContext2 = React.createContext();
//CounterContext={Provider,Consumer}
const Counter1 = () => {
  let { state, dispatch } = useContext(CounterContext1);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>-</button>
    </div>
  );
};
const Counter2 = () => {
  let { state, dispatch } = useContext(CounterContext2);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>-</button>
    </div>
  );
};
const Counter3 = () => {
  return (
    <CounterContext2.Consumer>
      {(value) => (
        <>
          <p>{value.state.number}</p>
          <button onClick={() => value.dispatch({ type: types.INCREMENT })}>
            +
          </button>
          <button onClick={() => value.dispatch({ type: types.DECREMENT })}>
            -
          </button>
        </>
      )}
    </CounterContext2.Consumer>
  );
};

function App() {
  let [state, dispatch] = useReducer(reducer, { number: 0 });
  return (
    <>
      <CounterContext1.Provider value={{ state, dispatch }}>
        <Counter1 />
      </CounterContext1.Provider>

      <CounterContext2.Provider value={{ state, dispatch }}>
        <Counter2 />
        <Counter3 />
      </CounterContext2.Provider>
    </>
  );
}
