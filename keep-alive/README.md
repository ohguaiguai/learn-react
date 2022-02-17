react17

- 不需要再引入 import React from 'react';

BrowserRoute

- 使用的是 history 而非 hash

keep-alive

- withKeepAlive，keep-alive 套件中的子组件。是一个高阶组件，会传入我们需要缓存的组件，能够拿到对应的虚拟 DOM
- KeepAliveProvider, keep-alive 套件中的父组件。

第一次渲染，withKeepAlive 挂载之后，调用父组件的 mount 方法，修改了 catchStates, 触发了父组件的重新渲染，从而把
