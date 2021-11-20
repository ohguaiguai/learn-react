import * as types from '../action-types';
import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects';
import Api from '../Api';
function* login(username: string, password: string) {
  try {
    yield put({ type: types.SET_LOADING, payload: true }); // loading
    const token = yield call(Api.login, username, password);
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: token,
    });
    //把token也放置到了localStorage里面去一份
    Api.set('token', token);
    //yield put({ type: types.SET_LOADING, payload: false });
  } catch (error) {
    alert(error);
    yield put({
      type: types.LOGIN_ERROR, //派发一个LOGIN_ERROR的action
      error,
    });
    //yield put({ type: types.SET_LOADING, payload: false });
  } finally {
    if (yield cancelled()) {
      alert('此任务是被取消了');
    }
    yield put({ type: types.SET_LOADING, payload: false }); // 关闭loading
  }
}
//导出一个saga函数，里面放置着我们的流程
export function* loginFlow() {
  while (true) {
    let action = yield take(types.LOGIN_REQUEST);
    let { username, password } = action;
    // fork就是相当于开启了一个新的进程，新的任务去运行，不会阻塞当前的saga
    // 点了登录之后立马点击登出这种情况

    // 创建了一个登录的任务
    let task = yield fork(login, username, password);

    //不管上面的登录是成功还是失败,都会继续执行,等待退出
    action = yield take([types.LOGOUT_REQUEST, types.LOGIN_ERROR]); //action={type:LOGOUT_REQUEST}
    if (action.type === types.LOGOUT_REQUEST) {
      yield cancel(task); // 取消这个登录任务
    }
    Api.clear('token');
    yield put({
      type: types.LOGOUT_SUCCESS, //为了清掉token
    });
  }
}
