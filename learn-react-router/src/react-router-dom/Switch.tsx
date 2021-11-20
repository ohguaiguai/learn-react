/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 15:35:17
 */
import React, { ReactElement } from 'react';
import RouterContext from './context';
import { pathToRegexp, Key } from 'path-to-regexp';
// ReactElement就是JSX.Element
//什么是ReactElement？ 是一个js对象{type,props,key}
interface Props {
  children: Array<ReactElement>;
}
export default class extends React.Component<Props> {
  // IMP
  static contextType = RouterContext;
  render() {
    //1.取到它的三个儿子，然后用当前路径和三个儿子一一匹配，如果匹配上了一个，就直接返回了，后面就不再匹配了
    let pathname = this.context.location.pathname;

    if (this.props.children) {
      for (let i = 0; i < this.props.children.length; i++) {
        let child: ReactElement = this.props.children[i];
        let {
          path = '/',
          exact = false,
          component: RouteComponent,
        } = child.props;
        let keys: Array<Key> = [];
        let regexp = pathToRegexp(path, keys, { end: exact });
        let result = pathname.match(regexp);
        if (result) {
          return child; // child就是是Route组件的实例, 是一个ReactElement
        }
      }
    }
    return null;
  }
}
