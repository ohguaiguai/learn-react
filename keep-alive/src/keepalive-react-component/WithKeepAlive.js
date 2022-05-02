import { useContext, useEffect, useRef } from 'react';
import CacheContext from './CacheContext';
import * as cacheTypes from './cache-types';

function withKeepAlive(
  OldComponent,
  { cacheId = window.location.pathname, scroll }
) {
  return function (props) {
    console.log('withKeepAlive render');
    let divRef = useRef(null);
    let { cacheStates, dispatch, mount, handleScroll } =
      useContext(CacheContext);
    // 处理滚动
    useEffect(() => {
      let onscroll = handleScroll.bind(null, cacheId);
      if (scroll) {
        divRef.current.addEventListener('scroll', onscroll, true);
      }
      return () => {
        divRef.current?.removeEventListener('scroll', onscroll, true);
      };
    }, [handleScroll]);
    // 上传reactElement到父组件 || 从父组件中获取真实dom
    useEffect(() => {
      let cacheState = cacheStates[cacheId];
      //   console.log(cacheId, 'useEffect', cacheState?.doms);
      if (
        cacheState &&
        cacheState.doms &&
        cacheState.status !== cacheTypes.DESTROY
      ) {
        let doms = cacheState.doms;
        doms.forEach((dom) => {
          divRef.current.appendChild(dom);
        });
        if (scroll) {
          doms.forEach((dom) => {
            if (cacheState.scrolls[dom]) {
              dom.scrollTop = cacheState.scrolls[dom];
            }
          });
        }
      } else {
        mount({
          cacheId,
          reactElement: <OldComponent {...props} dispatch={dispatch} />
        });
      }
    }, [cacheStates, dispatch, mount, props]);
    return (
      <div id={`with-keep-alive-${cacheId}`} ref={divRef}>
        {/* <OldComponent /> */}
      </div>
    );
  };
}
export default withKeepAlive;
/**
 * 通过缓存去创建OldComponent对应的真实DOM，并且进行缓存
 */
