### react17

- 不需要再引入 import React from 'react';

### BrowserRoute

- 使用的是 history

### keep-alive

- withKeepAlive，keep-alive 套件中的子组件。是一个高阶组件，会传入我们需要缓存的组件，能够拿到对应的虚拟 DOM
- KeepAliveProvider, keep-alive 套件中的父组件。cacheStates 就存在父组件中，这样当子组件销毁后, cacheStates 还在父组件中被引用，其中的 `doms` 仍然被缓存

流程：

第一次渲染，父中 cacheState 为{}, 子的 doms 为 undefined
第二次渲染，父中 cacheState 有数据, 子的 doms 为 undefined；子组件调用了 dispatch, 开始创建缓存修改了 cacheStates, 触发父组件的重新渲染，子组件本身也会重新渲染，此时子组件把 reactElement 传给了父组件。
第三次渲染，父中 cacheState 有数据, 子的 doms 有数据；父组件开始渲染 reactElement, 当真实 dom 挂载完成触发 dispatch, 创建缓存成功修改了 cacheStates, 触发父组件的重新渲染，子组件也会重新渲染，此时子组件拿到了真实的 dom。

父组件

```js
<CacheContext.Provider value={{ cacheStates, dispatch, mount }}>
  // 第一次
  {props.children}
  // 第二次
  {Object.values(cacheStates).map(({ cacheId, reactElement }) => (
    <div id={`keep-alive-${cacheId}`}>{reactElement}</div>
  ))}
</CacheContext.Provider>
```

理论上讲，被 withKeepAlive 包裹的组件会被渲染两次, 但并不是。因为 #{`keep-alive-${cacheId}`下的 dom 元素被#`with-keep-alive-${cacheId}`拿走了，appendChild 操作是 dom 操作，相当于剪切。

```html
<div id="root">
  <div id="with-keep-alive-Home">
    <div>首页</div>
  </div>
  <div id="keep-alive-Home"></div>
</div>
```

可以看到下面的#keep-alive-home 没有任何的内容。

其他：

组件内部状态的修改会自动更新 reactElement，这个过程不需要 dispatch 来更新缓存
