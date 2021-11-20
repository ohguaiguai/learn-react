/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 09:52:14
 */
import { History, Location } from '../history';
export interface ContextValue {
  location?: Location;
  history?: History;
}

export interface match<Params = {}> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export interface RouteComponentProps<Params = {}, C = any, S = any> {
  history: History;
  location: Location<S>;
  match?: match<Params>;
}
