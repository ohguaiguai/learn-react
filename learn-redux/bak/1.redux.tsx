function renderTitle(titleState: any) {
  let titleElement = document.getElementById('title');
  titleElement!.innerHTML = titleState.text;
  titleElement!.style.color = titleState.color;
}
function renderContent(contentState: any) {
  let contentElement = document.getElementById('content');
  contentElement!.innerHTML = contentState.text;
  contentElement!.style.color = contentState.color;
}

//仓库其实就是一个对象，里面引用一些闭包变量
function createStore(reducer: any) {
  let state: any;
  let listeners: any[] = [];
  function getState() {
    return state;
  }
  function dispatch(action: any) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  }
  //订阅方法返回了一个取消订阅的函数
  function subscribe(listener: any) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter((l) => l != listener);
    };
  }
  //在仓库内部立刻派发一个action
  dispatch({ type: '@@REDUX/INIT' });
  console.log('state', state);
  return {
    getState, //获取当前状态
    dispatch, //用来改变状态 dispatch(action)
    subscribe,
  };
}
//处理器，保安，接收老状态和动作，返回新状态
let initialState = {
  title: { color: 'red', text: '标题' },
  content: { color: 'green', text: '内容' },
};
function reducer(state: any = initialState, action: any) {
  switch (
    action.type //判断动作的类型
  ) {
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color;
      return state;
    case 'UPDATE_CONTENT_TEXT':
      state.content.text = action.text;
      return state;
    default:
      //如果不是我能识别的类型，不管了，什么都不做
      return state;
  }
}
let store = createStore(reducer);
function render() {
  renderTitle(store.getState().title);
  renderContent(store.getState().content);
}
let unsubscribe = store.subscribe(render);
render();
setTimeout(function () {
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'yellow' });
  store.dispatch({ type: 'UPDATE_CONTENT_TEXT', text: '新的内容' });
  unsubscribe();
}, 3000);
setTimeout(function () {
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' });
  store.dispatch({ type: 'UPDATE_CONTENT_TEXT', text: '旧的内容' });
}, 6000);

export {};
