import * as types from './action-types';
export default {
  increment() {
    return { type: types.INCREMENT };
  },
  asyncIncrement() {
    //当调用此方法的时候会向仓库派发一个异步加1(ASYNC_INCREMENT)的动作
    ///这个ASYNC_INCREMENT动作是派发了watcherSaga 监听saga
    //rootSaga就是饭店的入口  watcherSaga就是服务员  workerSaga厨师
    return { type: types.ASYNC_INCREMENT };
  },
  login(username: string, password: string) {
    //我要把此命令发给saga，然后调用登录的方法进行登录
    return { type: types.LOGIN_REQUEST, username, password };
  },
  logout() {
    //我要把此命令发给saga，然后调用登录的方法进行登录
    return { type: types.LOGOUT_REQUEST };
  },
};
