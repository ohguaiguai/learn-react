import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
let sagaMiddleware = createSagaMiddleware();
//sagaMiddleware就是我们进程管理器
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
//让进程管理器启动saga
sagaMiddleware.run(rootSaga);
export default store;
