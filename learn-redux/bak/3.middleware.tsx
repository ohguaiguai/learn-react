import { createStore, AnyAction } from '../redux';
import rootReducer from './reducers';
import * as TYPES from '../store/action-types';
const store = createStore(rootReducer);
/**
 * 1.中间件核心原理是什么？
 * 中间件的核心原理就是一个替换，用自己的写的dispatch方法把store.dispatch替换
 */
//仓库中老的dispatch方法，用来派发action
let originDispatch = store.dispatch;
/* store.dispatch = (action: AnyAction): AnyAction => {
    if (action.type === TYPES.INCREMENT1) {
        setTimeout(() => {
            originDispatch(action);
        }, 1000);
    } else {
        originDispatch(action);
    }
    return action;
} */
//logger中间件就是在每次仓库状态变更之后，打印新状态
store.dispatch = (action: AnyAction): AnyAction => {
  console.log('变更前的老状态', store.getState());
  originDispatch(action);
  console.log('变更后的新状态', store.getState());
  return action;
};
export default store;
