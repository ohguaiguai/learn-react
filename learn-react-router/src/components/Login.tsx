/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 21:51:10
 */
import React from 'react';
import { RouteComponentProps } from '../react-router-dom';
type Props = RouteComponentProps; // 通过路由渲染出来的组件都有的类型
export default class extends React.Component<Props> {
  handleLogin = () => {
    localStorage.setItem('logined', 'true');
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from); // 重定向
    }
  };
  render() {
    return (
      <button onClick={this.handleLogin} className='btn btn-primary'>
        登录
      </button>
    );
  }
}
