/**
 * @file: description
 * @author: zhangxing
 * @description: HashRouter是一个包裹Route的容器，负责向下传递context
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 23:10:22
 */
import React from 'react';
import { History, Location, LocationDescriptor } from '../history';
import RouterContext from './context';
import { ContextValue, Message } from './';
interface Props {}
interface State {
  location: Location;
}
//在此组件里定义一个Location路径对象，然后通过上下文context传递给它的子组件们
export default class extends React.Component<Props, State> {
  locationState: any;
  state = {
    location: {
      // /a#/user =>  window.location.hash=#/user => /user
      pathname: window.location.hash.slice(1),
    },
  };
  componentDidMount() {
    // HashChangeEvent 原生事件类型
    window.addEventListener('hashchange', (event: HashChangeEvent) => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/',
          state: this.locationState,
        },
      });
    });
    //如果没有这行代码，就没有默认的hash值
    window.location.hash = window.location.hash || '/'; // 赋值的时候不用写'#/'; 取的时候可以拿到'#/'
  }
  render() {
    let that = this; //缓存this指针
    let history: History = {
      push(to: LocationDescriptor) {
        // 说明要阻止跳转
        if (history.message) {
          let allow = window.confirm(
            history.message(
              typeof to === 'object' ? (to as Location) : { pathname: to }
            )
          );
          if (!allow) return;
        }
        if (typeof to === 'object') {
          let { pathname, state } = to;
          that.locationState = state; //这个时候先缓存location中的状态， 监听到hashchange事件时使用
          window.location.hash = pathname;
        } else {
          that.locationState = null;
          window.location.hash = to;
        }
      },
      message: null,
      block(message: Message | null) {
        history.message = message;
      },
    };
    // 上下文
    let contextValue: ContextValue = {
      location: this.state.location,
      history,
    };
    return (
      <RouterContext.Provider value={contextValue}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
