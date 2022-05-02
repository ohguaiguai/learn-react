import { useCallback, useReducer } from 'react';
import cacheReducer from './cacheReducer';
import CacheContext from './CacheContext';
import * as cacheTypes from './cache-types';

function KeepAliveProvider(props) {
  // cacheState存放缓存相关信息，dispatch派发动作来修改缓存信息
  let [cacheStates, dispatch] = useReducer(cacheReducer, {});
  console.log(cacheStates);
  // 给子组件调用
  const mount = useCallback(
    ({ cacheId, reactElement }) => {
      let cacheState = cacheStates[cacheId];
      if (cacheState) {
        if (cacheState.status === cacheTypes.DESTROY) {
          let doms = cacheState.doms;
          doms.forEach((dom) => dom.parentNode.removeChild);
          dispatch({
            type: cacheTypes.CREATE,
            payload: { cacheId, reactElement }
          });
        }
      } else {
        dispatch({
          type: cacheTypes.CREATE,
          payload: { cacheId, reactElement }
        });
      }
    },
    [cacheStates]
  );
  //   console.log(cacheStates);
  let handleScroll = useCallback(
    (cacheId, event) => {
      if (cacheStates[cacheId]) {
        let target = event.target;
        let scrolls = cacheStates[cacheId].scrolls;
        scrolls[target] = target.scrollTop;
      }
    },
    [cacheStates]
  );
  return (
    <CacheContext.Provider
      value={{ cacheStates, dispatch, mount, handleScroll }}
    >
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, reactElement }) => (
          <div
            id={`keep-alive-${cacheId}`}
            key={cacheId}
            // 给原生组件添加ref, 那么当此真实DOM渲染到页面之后会执行回调函数
            ref={(divDOM) => {
              let cacheState = cacheStates[cacheId];
              if (divDOM && !cacheState.doms) {
                let doms = Array.from(divDOM.childNodes);
                dispatch({
                  type: cacheTypes.CREATED,
                  payload: { cacheId, doms }
                });
              }
            }}
          >
            {reactElement}
          </div>
        ))}
    </CacheContext.Provider>
  );
}
export default KeepAliveProvider;
