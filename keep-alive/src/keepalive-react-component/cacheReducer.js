import * as cacheTypes from './cache-types';

function cacheReducer(cacheStates, action) {
  let payload = action.payload;
  switch (action.type) {
    case cacheTypes.CREATE:
      return {
        ...cacheStates,
        [payload.cacheId]: {
          cacheId: payload.cacheId,
          reactElement: payload.reactElement,
          status: cacheTypes.CREATE
        }
      };
    default:
      break;
  }
}

export default cacheReducer;
