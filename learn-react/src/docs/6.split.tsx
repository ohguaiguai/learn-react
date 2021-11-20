import React from 'react';
import ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');
/**
 * 复合组件和提供组件
 *
 */
interface PanelProps {
  headString: string;
  bodyString: string;
}
interface HeadProps {
  headString: string;
}
interface BodyProps {
  bodyString: string;
}
class Head extends React.Component<HeadProps> {
  render(): React.ReactElement {
    return (
      <div style={{ border: '1px solid green', padding: 5 }}>
        {this.props.headString}
      </div>
    );
  }
}
class Body extends React.Component<BodyProps> {
  render(): React.ReactElement {
    return (
      <div style={{ border: '1px solid blue', padding: 5 }}>
        {this.props.bodyString}
      </div>
    );
  }
}
class Panel extends React.Component<PanelProps> {
  render(): React.ReactElement {
    let { headString, bodyString } = this.props;
    return (
      <div style={{ border: '1px solid red', padding: 5 }}>
        <Head headString={headString} />
        <Body bodyString={bodyString} />
      </div>
    );
  }
}
let panelProps: PanelProps = {
  headString: '我是头',
  bodyString: '我是身体',
};
ReactDOM.render(<Panel {...panelProps} />, root);
