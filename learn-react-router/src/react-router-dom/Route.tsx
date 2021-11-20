/**
 * @file: description
 * @author: zhangxing
 * @description:
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 21:30:40
 */
import React, { ComponentType } from 'react';
import RouterContext from './context';
import { pathToRegexp, Key } from 'path-to-regexp';
import { RouteComponentProps, match } from './';
// import { Route } from 'react-router-dom';
import { LocationDescriptor } from '../history';
//在TS当你定义一个类的时候，其它得到二个类型，第一个是类的实例的类型，第二个是类的构造函数类型
interface RouteProps {
  path?: LocationDescriptor;
  exact?: boolean;
  // 1. typeof React.Component
  // 2. React.JSXElementConstructor<any>
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>; // typeof React.Component
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: (props: RouteComponentProps<any>) => React.ReactNode;
}
//Route的核心作用是判断当前组件的 path属性和浏览器的路径是否一致
export default class extends React.Component<RouteProps> {
  // IMP: 如果一个类有一这样的一个属性static contextType，那么内部this.context=RouterContext.Provider.value
  static contextType = RouterContext;
  //什么时候会用Consumer? 函数组件里； 什么时候会用contextType?类组件
  render() {
    // RouteComponent 解构的时候给component起了个别名
    let {
      path = '/',
      component: RouteComponent,
      exact = false,
      render,
      children,
    } = this.props;
    //我们要通过this.context获取路径,然后跟Route的path去比较
    let pathname = this.context.location.pathname; // 地址栏中的hash
    let keys: Array<Key> = [];
    let routePath: string = typeof path == 'object' ? path.pathname : path;
    let regexp = pathToRegexp(routePath, keys, { end: exact });
    let result: Array<string> = pathname.match(regexp);
    let routeComponentProps: RouteComponentProps<any> = {
      location: this.context.location,
      history: this.context.history,
    };
    //pathname="/user/detail/1" 对应的 path="/user/detail/:id"
    //匹配的结果是： result=['/user/detail/1','1']
    if (result) {
      let [url, ...values] = result; //url=/user/detail/1 values=['1']
      let paramNames = keys.map((key: Key) => key.name); //['id']
      let memo: Record<string, any> = {};
      let params = values.reduce(
        (memo: Record<string, any>, value: string, index: number) => {
          memo[paramNames[index]] = value;
          return memo;
        },
        memo
      ); //params={id:'1'}
      type Params = typeof params;
      let matchResult: match<Params> = {
        params,
        isExact: url === path,
        path: routePath,
        url,
      };
      //如果路径匹配，则match属性指向匹配对象
      routeComponentProps.match = matchResult;
      if (RouteComponent) {
        return <RouteComponent {...routeComponentProps} />;
      } else if (render) {
        return render(routeComponentProps);
      } else if (children) {
        return children(routeComponentProps);
      } else {
        return null;
      }
    } else {
      if (children) {
        return children(routeComponentProps);
      } else {
        return null;
      }
    }
  }
}
