import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// FixedSizeList 固定长度列表,只渲染可视区域的内容
import { FixedSizeList as List } from './react-window';
//index 代表索引 style代表样式
const Row = ({ index, style }) => (
  <div
    key={index}
    style={{
      ...style,
      backgroundColor: getRandomColor(),
      lineHeight: '30px',
      textAlign: 'center'
    }}
  >
    Row{index + 1}
  </div>
);
const Container = () => (
  <List height={150} itemSize={30} itemCount={100} width={'100%'}>
    {Row}
  </List>
);
setTimeout(() => {
  ReactDOM.render(<Container />, document.getElementById('root'));
}, 2000);

function getRandomColor() {
  let rand = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase();
  if (rand.length == 6) {
    return '#' + rand;
  } else {
    return getRandomColor();
  }
}
