/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-12-03 16:37:24
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-07-10 10:39:45
 */
import React from 'react';
export class FixedSizeList extends React.Component {
  constructor() {
    super();
    this.containerRef = React.createRef();
  }
  state = { start: 0 }; //要显示的元素的起始索引 0~4
  componentDidMount() {
    this.containerRef.current.addEventListener('scroll', () => {
      let scrollTop = this.containerRef.current.scrollTop;
      // 关键点
      let start = Math.floor(scrollTop / this.props.itemSize); // 计算开始索引
      this.setState({ start });
    });
  }
  render() {
    let { width, height, itemSize, itemCount } = this.props;
    //width height list宽度和高度
    // itemSize itemCount 条目的高度和条目的总数量
    let children = [];
    let pageSize = Math.floor(height / itemSize) + 1; // 每一页的条目数,最好加一个
    let itemStyle = {
      height: itemSize,
      width: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    };
    for (let i = this.state.start; i < this.state.start + pageSize; i++) {
      let style = { ...itemStyle, top: i * itemSize };
      // this.props.children 就是Row, 是一个函数
      children.push(this.props.children({ index: i, style }));
    }
    let containerStyle = {
      width,
      height,
      position: 'relative',
      overflow: 'auto'
    };
    return (
      <div style={containerStyle} ref={this.containerRef}>
        <div style={{ width: '100%', height: itemSize * itemCount }}>
          {children}
        </div>
      </div>
    );
  }
}
