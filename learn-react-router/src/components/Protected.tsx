/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 21:48:58
 */
import React, { ComponentType } from 'react';
import { Route, Redirect, RouteComponentProps } from '../react-router-dom';
// ComponentType代表一个类组件或者一个函数组件
interface Props {
  path: string;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
/**
 * Route的渲染有三种方式
 * 第1种 component 简单，但是不能传参数，也不能加渲染的逻辑
 * 第2种 传递一个render方法 也是看路径是否匹配，如果路径匹配的话就渲染render方法的返回值
 * 第3种 传递children方法
 */
// 导出一个函数组件
export default (props: Props) => {
  let { path, component: RouteComponent } = props;
  return (
    <Route
      path={path}
      render={(renderProps: any) =>
        localStorage.getItem('logined') ? (
          <RouteComponent {...renderProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: renderProps.location.pathname },
            }}
          />
        )
      }
    />
  );
};
