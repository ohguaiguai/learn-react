import { useRef } from 'react';
function withKeepAlive(OldComponent, { cacheId = window.location.pathname }) {
  return function (props) {
    let divRef = useRef();

    return <div ref={divRef}>{/* <OldComponent /> */}</div>;
  };
}
export default withKeepAlive;
/**
 * 通过缓存去创建OldComponent对应的真实DOM，并且进行缓存
 */
