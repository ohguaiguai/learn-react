//actions: {
//     increment(){return {type:'INCREMENT'}},
//     decrement(){return {type:'DECREMENT'}}
// }
//boundActions: {
//     increment(){
//         return dispatch({type:'INCREMENT'})
//     },
//     decrement(){
//         return dispatch({type:'DECREMENT'})
//     }
// }
import { Action, AnyAction, Dispatch } from './';
// Action 是一个对象
// AnyAction是继承Action类型的一个对象
// 定义的是actionCreator的类型， actionCreator是一个函数
export interface ActionCreator<A = AnyAction> {
  (...args: Array<any>): A; // 这是一个函数, 参数是任意类型, 返回一个A类型
}
// ActionCreatorsMapObject是一个对象，每一个属性的值是就是一个actionCreator
export interface ActionCreatorsMapObject<A = AnyAction> {
  [key: string]: ActionCreator<A>;
}
// bindActionCreators绑定多个actionCreator
export default function bindActionCreators<
  M extends ActionCreatorsMapObject<A>,
  A
>(actionCreators: M, dispatch: Dispatch<A>) {
  let boundActionCreators: ActionCreatorsMapObject<A> = {}; ///[propName:string]:any
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator<A>(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
// 绑的是一个actionCreator
function bindActionCreator<A>(
  actionCreator: ActionCreator<A>,
  dispatch: Dispatch<A>
): any {
  return function (this: any, ...args: Array<any>) {
    return dispatch(actionCreator.apply(this, args));
  };
}
