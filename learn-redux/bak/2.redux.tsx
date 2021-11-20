import {
  createStore,
  Action,
  AnyAction,
  Dispatch,
  Reducer,
  Store,
} from './redux';
let counterValue: HTMLParagraphElement = document.getElementById(
  'counter-value'
) as HTMLParagraphElement;
let incrementBtn: HTMLButtonElement = document.getElementById(
  'increment'
) as HTMLButtonElement;
let decrementBtn: HTMLButtonElement = document.getElementById(
  'decrement'
) as HTMLButtonElement;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
interface State {
  //仓库的状态类型
  number: number;
}
let initialState: State = { number: 0 };
//AnyAction属性任意给CounterAction={t:any,amount:number}
type CounterAction = Action<string>;
const reducer: Reducer<State, CounterAction> = (
  state: State = initialState,
  action: CounterAction
): State => {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 };
    case DECREMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
};
let store: Store<State, CounterAction> = createStore<
  State,
  CounterAction,
  {},
  {}
>(reducer);
function render() {
  counterValue.innerHTML = store.getState().number + '';
}
render();
store.subscribe(render);
let dispatch: Dispatch<CounterAction> = store.dispatch;
incrementBtn.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: INCREMENT });
});
decrementBtn.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: DECREMENT });
});
