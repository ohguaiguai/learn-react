import { all } from 'redux-saga/effects';
import { watchIncrementAsync, watchAndLog } from './take';
import { loginFlow } from './login';

// saga generator执行后返回的是iterator
// 如果yield 了一个iterator,那么sagaMiddleware就会启动iterator的自动执行
export default function* rootSaga() {
  //yield all 有点像Promise.all([promise1,promise2])
  yield all([loginFlow()]);
}
