import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
interface Props {}
interface State {
  messages: Array<string>;
}
class ScrollList extends React.Component<Props, State> {
  timer: number;
  wrapper: RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = { messages: [] };
    this.wrapper = React.createRef<HTMLDivElement>();
  }
  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({
        messages: [
          `message-${this.state.messages.length}`,
          ...this.state.messages,
        ],
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // 1：在render之前调用，state已更新
  // 2：典型场景：获取render之前的dom状态
  getSnapshotBeforeUpdate(): number {
    return this.wrapper.current!.scrollHeight; //内容高度
  }
  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    prevScrollHeight: number
  ) {
    // 保证上面插入内容后页面不会被挤下去
    this.wrapper.current!.scrollTop =
      this.wrapper.current!.scrollTop +
      (this.wrapper.current!.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: 100,
      width: 200,
      border: '1px solid red',
      overflow: 'auto',
    };
    return (
      <div style={style} ref={this.wrapper}>
        {this.state.messages.map((message: string, index: number) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    );
  }
}
ReactDOM.render(<ScrollList />, document.getElementById('root'));
