import React, { Component } from 'react';
import ReactDOM from 'react-dom';
interface Props {
  render: (value: State) => React.ReactNode;
}
interface State {
  x: number;
  y: number;
}
type PropsFromState = State;
class MouseTracker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (event: React.MouseEvent) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };
  render() {
    return (
      <div
        onMouseMove={this.handleMouseMove}
        style={{ border: '1px solid red' }}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}
//这是一个普通函数组件
const MyComponent = (value: PropsFromState) => (
  <div>
    <p>请现在移动鼠标</p>
    <p>
      当前鼠标的位置x:{value.x},y:{value.y}
    </p>
  </div>
);
function withMouseTracker(OldComponent: React.FC<PropsFromState>) {
  return (props: {}) => {
    return (
      <MouseTracker
        render={(mouseProps) => <OldComponent {...props} {...mouseProps} />}
      />
    );
  };
}
const WithMouseTrackerMyComponent = withMouseTracker(MyComponent);
ReactDOM.render(
  <WithMouseTrackerMyComponent />,
  document.getElementById('root')
);
