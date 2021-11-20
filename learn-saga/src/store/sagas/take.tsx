import * as types from '../action-types';
import { delay, take, takeEvery, put, all, select } from 'redux-saga/effects';
//takeEvery 监听每一次动作，当动作发生的时候执行对应的saga
//takeEvery是一个高级语法糖，内部是靠take实现的
//takeEvery是一个死循环，会一直监听每一次动作。而take只会监听一次，触发一次就销毁
// takeEvery    就像events中的on， dom中的addEventListener
// take就像 once

/*function* incrementAsync() {
    // 后面跟一个promise， sagaMiddleWare会停下来，等待这个promise变为成功态
    yield delay(1000);

    yield put({type: types.INCREMENT});// 相当于store.dispatch({type: types.INCREMENT})
}
function* watchIncrementAsync() {
    // takeEvery是一个函数，接收两个参数。1是动作类型，2是workerSaga
    // 相当于向管理器发出了一个effect(指令对象)
    yield takeEvery(types.ASYNC_INCREMENT, incrementAsync);
}*/

export function* watchIncrementAsync() {
  for (let i = 0; i < 3; i++) {
    // take会等待动作派发，如果没有人派发就一直卡在这
    let action = yield take(types.ASYNC_INCREMENT);

    // yield put({ type: types.INCREMENT });
    yield put(action);
  }
  alert('已经达到了最大值3');
}

export function* watchAndLog() {
  //我要在这里记录每一次派发的动作，当动作派发之后打印日志。
  while (true) {
    let action = yield take('*'); //*代表一个通配符，代表所有的动作, 会卡在这所以不会出现栈溢出的情况
    console.log(action);
    //select如果不传参数，返回的就是当前仓库中的状态
    //如果传一个函数，就代表先从仓库中获取总的状态，然后得到返回值。
    //mapStateToProps
    let state = yield select((state) => state.number);
    console.log('state', state);
  }
}
