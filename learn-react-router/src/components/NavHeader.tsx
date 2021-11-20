/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 22:21:42
 */
import React from 'react';
import { RouteComponentProps } from '../react-router-dom';
import { withRouter } from '../react-router-dom';
// 只有当一个组件是通过路由Route渲染出来的话才会有RouteComponentProps里的属性
interface NavHeaderProps {
  title: string;
}

class NavHeader extends React.Component<RouteComponentProps & NavHeaderProps> {
  render() {
    return (
      <div className='navbar-header'>
        <div
          onClick={(event: React.MouseEvent) => this.props.history.push('/')}
          className='navbar-brand'
        >
          {this.props.title}
        </div>
      </div>
    );
  }
}
export default withRouter<NavHeaderProps>(NavHeader); // 把一个非路由组件变成了路由组件，路由组件就可以使用history等属性
