import { call, apply, cps } from 'redux-saga/effects';
import { delay, readFile } from '../../utils';
//call像js中的call
export function* read() {
  let school = { name: '珠峰架构' };
  //call就是调用delay,并传入1000参数, delay方法会返回一个promise, middleware会等待promise完成。
  let result = yield call([school, delay], 1000, 2000); // school作为上下文传入
  //let result = yield apply(school, delay, [1000, 2000]);//
  //let result = yield cps(readFile,'1.txt');// readFile可以不用返回一个promise， 如果返回promise就使用call， apply
  console.log('result', result);
}
