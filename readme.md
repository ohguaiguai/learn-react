https://segmentfault.com/a/1190000038874526

#### react-app-env.d.ts 的作用

```
/// <reference types="react-scripts" />
```

上面 react-app-env.d.ts 依赖 react-scripts 库的类型声明文件，react-scripts 下的 package.json 中 types 指定了 TypeScript 的入口文件

#### setState

setTimeout 里的代码比较特殊，不会走批量更新，会立刻进行更新

```js
setTimeout(() => {
  this.setState({ number: this.state.number + 1 });
  console.log(this.state.number); //2
  this.setState({ number: this.state.number + 1 });
  console.log(this.state.number); //3
}, 0);
```
