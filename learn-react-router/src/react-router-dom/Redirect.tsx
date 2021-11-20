/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 16:04:36
 */
import React, { ReactNode } from 'react';
import { LocationDescriptor } from '../history';
import RouterContext from './context';
type Props = React.PropsWithChildren<{
  to: LocationDescriptor;
}>;
export default class extends React.Component<Props> {
  static contextType = RouterContext;
  render(): ReactNode {
    this.context.history.push(this.props.to);
    return null;
  }
}
