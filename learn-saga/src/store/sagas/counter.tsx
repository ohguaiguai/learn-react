import * as types from '../action-types';
import { delay, take, takeEvery, put, all } from 'redux-saga/effects';
//saga就是一个generator函数。如何定义一个generator函数，就是在function和方法名之间写一个星号
//我们要写一个watcherSaga
export function delay1(this: any, ms: number, ms2: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let number = Math.random();
      if (number > 0.5) {
        resolve(number);
      } else {
        reject('出错了');
      }
    }, ms + ms2);
  });
}
export function* incrementAsync1() {
  try {
    //yield后面可以跟一个promise,sagaMiddleware会停下来，等待这个promise变成成功态
    //等这个promise成功之后，会继续向下执行
    yield delay1(1000, 100);
    //store.dispatch({ type: types.INCREMENT })
    yield put({ type: types.INCREMENT });
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

export function delay2(this: any, ms: number, ms2: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let number = Math.random();
      if (number > 0.5) {
        //成功还是失败是通过状态码code来表示code=0表示成功 code=1表示失败
        resolve({ data: number, code: 0 });
      } else {
        resolve({ data: '发生错误', code: 1 });
      }
    }, ms + ms2);
  });
}
export function* incrementAsync2() {
  //yield后面可以跟一个promise,sagaMiddleware会停下来，等待这个promise变成成功态
  //等这个promise成功之后，会继续向下执行
  let result = yield delay2(1000, 100);
  let { data, code } = result;
  if (code == 0) {
    //store.dispatch({ type: types.INCREMENT })
    yield put({ type: types.INCREMENT });
  } else {
    alert(data);
  }
}
export function* watchAsyncIncrement() {
  //takeEvery是一个函数，接收二个参数。1个是动作类型 2个是workerSaga
  //相当于向管理器发出了一个effect(指令对象)
  yield takeEvery(types.ASYNC_INCREMENT, incrementAsync2);
}
