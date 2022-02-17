import { useCallback, useReducer } from 'react';
import cacheReducer from './cacheReducer';
import CacheContext from './CacheConext';
import * as cacheTypes from './cache-types';

function KeepAliveProvider(props) {
  // cacheState存放缓存相关信息，dispatch派发动作来修改缓存信息
  let [cacheState, dispatch] = useReducer(cacheReducer, {});
  const mount = useCallback(({ cacheId, reactElement }) => {
    dispatch({ type: cacheTypes.CREATE, payload: { cacheId, reactElement } });
  });
  return (
    <CacheContext.Provider value={{ cacheState, dispatch }}>
      {props.children}
    </CacheContext.Provider>
  );
}
export default KeepAliveProvider;
