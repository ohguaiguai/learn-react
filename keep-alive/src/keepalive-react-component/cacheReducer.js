import * as cacheTypes from './cache-types';

function cacheReducer(cacheStates, action) {
  let payload = action.payload;
  let cacheId = payload.cacheId;
  switch (action.type) {
    case cacheTypes.CREATE:
      return {
        ...cacheStates,
        [cacheId]: {
          cacheId,
          reactElement: payload.reactElement,
          status: cacheTypes.CREATE,
          doms: undefined,
          scrolls: {} // 滚动信息保存对象，key是滚动的dom，值是滚动的位置
        }
      };
    case cacheTypes.CREATED:
      return {
        ...cacheStates,
        [cacheId]: {
          ...cacheStates[cacheId],
          status: cacheTypes.CREATED,
          doms: payload.doms
        }
      };
    case cacheTypes.DESTROY:
      return {
        ...cacheStates,
        [cacheId]: {
          ...cacheStates[cacheId],
          status: cacheTypes.DESTROY
        }
      };
    default:
      return cacheStates;
  }
}

export default cacheReducer;
