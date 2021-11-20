import { AnyAction } from 'redux';
import * as types from './action-types';
export interface CounterState {
  number?: number;
  token?: string;
  error?: string;
  loading?: boolean;
}
let initialState: CounterState = { number: 0, loading: false };
export default function (
  state: CounterState = initialState,
  action: AnyAction
): CounterState {
  switch (action.type) {
    case types.INCREMENT:
      return { number: state.number! + 1 };
    case types.LOGIN_SUCCESS:
      return { token: action.payload };
    case types.LOGIN_ERROR:
      return { error: action.error };
    case types.LOGOUT_SUCCESS:
      return { token: '' };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
