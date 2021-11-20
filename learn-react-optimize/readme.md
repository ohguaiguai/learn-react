### 骨架屏

1. 安装 `react-dom/server` `react-content-loader`
2. 新建一个入口 skeleton.js， 最终导出一个 svg

```js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ContentLoader from 'react-content-loader';
//ReactDOM.render(<ContentLoader/>,document.getElementById('root'));
// 把一个组件变成一个字符串
let html = ReactDOMServer.renderToStaticMarkup(<ContentLoader />);
// html就是一个svg图片
export default html; //es6 默认导出
```

3. 配置 webpack.skeleton.js， 之后会传给下面的 SkeletonWebpackPlugin

```js
const path = require('path');
const base = require('./webpack.base');
const { smart } = require('webpack-merge');
module.exports = smart(base, {
  target: 'node',
  entry: './src/skeleton.js',
  output: {
    filename: 'skeleton.js',
    //导出库的方式
    libraryTarget: 'commonjs2'
  },
  plugins: []
});
```

4. 开发一个骨架屏插件 SkeletonWebpackPlugin，读取上面生成的 skeleton.js

```js
/**
我是一个插件，在编译 src/index.js的时候生效
我负责启动一次新的webpack编译,用webpack.skeleton.js 做为配置文件，得到输出的结果
输出的其实是一个svg图片，然后我把这个svg图片直接插入到<div id="root"><svg></svg></div>
compiler代表整个编译对象
compilation代表一次编译
 */
let webpack = require('webpack');
let path = require('path');
let requireFromString = require('require-from-string');
let MFS = require('memory-fs'); //内存版的fs模块
let mfs = new MFS();
// 类
class SkeletonWebpackPlugin {
  constructor(options) {
    this.options = options; // skeletonWebpackOption
  }
  apply(compiler) {
    let { webpackConfig } = this.options;
    compiler.hooks.compilation.tap('SkeletonWebpackPlugin', (compilation) => {
      //我们在要这监听html处理事件
      //就是一发布 观察者
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'SkeletonWebpackPlugin',
        (htmlPluginData, callback) => {
          // 我在这个地方要开启一次新的webpack编译，得到编译的结果
          let childCompiler = webpack(webpackConfig);
          let outputPath = path.join(
            webpackConfig.output.path,
            webpackConfig.output.filename
          );
          // 指定webpack编译后用什么模 块进行输出
          childCompiler.outputFileSystem = mfs;
          childCompiler.run((err, stat) => {
            //以同步的方式读取文件内容
            let skeletonJS = mfs.readFileSync(outputPath, 'utf8');
            let result = requireFromString(skeletonJS);
            let svgHtml = result.default;
            htmlPluginData.html = htmlPluginData.html.replace(
              '<div id="root"></div>',
              `<div id="root">${svgHtml}</div>`
            );
            callback(null, htmlPluginData);
          });
        }
      );
    });
  }
}
module.exports = SkeletonWebpackPlugin;
```

5. 在 webpack.config.js 中配置该插件

```js
const base = require('./webpack.base');
const { smart } = require('webpack-merge');
const SkeletonWebpackPlugin = require('./SkeletonWebpackPlugin');
module.exports = smart(base, {
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  plugins: [
    new SkeletonWebpackPlugin({
      webpackConfig: require('./webpack.skeleton')
    })
  ]
});
```

6. 最终项目打包后的 index.html。其实就是预渲染，只不过预渲染的内容是骨架屏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <svg
        role="img"
        aria-label="Loading interface..."
        viewBox="0 0 400 130"
        preserveAspectRatio="none"
      >
        <title>Loading interface...</title>
        <rect
          x="0"
          y="0"
          width="400"
          height="130"
          clip-path="url(#lelvtst26yf)"
          style="fill:url(#yd39qblyk3)"
        ></rect>
        <defs>
          <clipPath id="lelvtst26yf">
            <rect x="0" y="0" rx="5" ry="5" width="400" height="130"></rect>
          </clipPath>
          <linearGradient id="yd39qblyk3">
            <stop offset="0%" stop-color="#f0f0f0" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-2; -2; 1"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop offset="50%" stop-color="#e0e0e0" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-1; -1; 2"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop offset="100%" stop-color="#f0f0f0" stop-opacity="1">
              <animate
                attributeName="offset"
                values="0; 0; 3"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

### 其他优化

https://juejin.cn/post/6844903544558977037
