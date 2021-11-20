/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 09:30:47
 */

import { createContext } from 'react';
import { ContextValue } from './';
let RouterContext = createContext<ContextValue>({}); // 传递一个默认值空对象
export default RouterContext;
